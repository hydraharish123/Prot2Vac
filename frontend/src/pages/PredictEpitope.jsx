import { useNavigate } from "react-router-dom";
import { useSequence } from "../contexts/SequenceContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import Mhci_table from "../features/epitopePrediction/Mhci_table";
import Mhcii_table from "../features/epitopePrediction/Mhcii_table";
import Select from "../ui/Select";
import Heading from "../ui/Heading";
import styled from "styled-components";
const options = [
  { value: "MHCI", label: "MHCI prediction" },
  { value: "MHCII", label: "MHCII prediction" },
];

const StyledDiv = styled.div`
  padding: 0rem 2.4rem 6.4rem;
`;

function PredictEpitope() {
  const { sequence } = useSequence();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mhci, setMHCI] = useState([]);
  const [mhcii, setMHCII] = useState([]);
  const [selectedTable, setSelectedTable] = useState("MHCI");

  function handleChangeTable(e) {
    setSelectedTable(e.target.value);
  }

  useEffect(() => {
    if (!sequence) {
      navigate("/");
    } else {
      fetchPrediction(sequence);
    }
  }, [navigate, sequence]);

  const parseTsvToJson = (tsvString) => {
    const lines = tsvString.trim().split("\n");
    const headers = lines[0].split("\t");

    return lines.slice(1).map((line) => {
      const values = line.split("\t");
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      return obj;
    });
  };

  const fetchPrediction = async (seq) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sequence: seq }),
      });

      if (!res.ok) throw new Error("Failed to fetch prediction");

      const data = await res.json();
      setPrediction(data);
      const mhci_result = parseTsvToJson(data.mhci.result);
      const mhcii_result = parseTsvToJson(data.mhcii.result);
      const filteredMHCI = mhci_result.filter(
        (row) => row.percentile_rank < 10 && row.ic50 < 500
      );
      const sortedMHCI = filteredMHCI.sort((a, b) => a.ic50 - b.ic50);

      const filteredMHCII = mhcii_result.filter(
        (row) => row.adjusted_rank < 2 && row.ic50 < 1000
      );
      const sortedMHCII = filteredMHCII.sort((a, b) => a.ic50 - b.ic50);
      setMHCI(sortedMHCI);
      setMHCII(sortedMHCII);
      console.log(data);
    } catch (err) {
      setError(err.message);
      toast.error(`Error during prediction: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  function handleDownload(data, epitope) {
    const blob = new Blob([data], {
      type: "text/tab-separated-values;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${epitope}_predictions.tsv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (!sequence) return null;

  return (
    <StyledDiv>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : prediction ? (
        <div className="flex flex-col gap-8">
          <div className="flex justify-between mb-8 items-center">
            <Heading as="h1">Epitope Prediction</Heading>

            <Select
              options={options}
              value={selectedTable}
              onChange={handleChangeTable}
              type="white"
            />
          </div>

          {selectedTable === "MHCI" && (
            <Mhci_table
              predictionData={mhci}
              handleDownload={handleDownload}
              prediction={prediction}
            />
          )}
          {selectedTable === "MHCII" && (
            <Mhcii_table
              predictionData={mhcii}
              handleDownload={handleDownload}
              prediction={prediction}
            />
          )}
        </div>
      ) : (
        <p>No results available</p>
      )}
    </StyledDiv>
  );
}

export default PredictEpitope;
