import { useNavigate } from "react-router-dom";
import { useMRNASequence } from "../contexts/MRNAsequenceContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Results() {
  const { mrnaSequence } = useMRNASequence();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!mrnaSequence) {
      navigate(-1);
    } else {
      fetchResults(mrnaSequence);
    }
  }, [navigate, mrnaSequence]);

  const fetchResults = async (seq) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/rnafold", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sequence: seq }),
      });

      if (!res.ok) throw new Error("Failed to fetch results from RNAfold");
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {mrnaSequence}
      {loading ? (
        <p>loading...</p>
      ) : data ? (
        <img
          src={`data:image/png;base64,${data.image_base64}`}
          alt="My Image"
        />
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default Results;
