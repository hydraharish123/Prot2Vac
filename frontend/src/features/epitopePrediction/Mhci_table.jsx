import Table from "../../ui/Table";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Confirm from "../../ui/Confirm";
import { useNavigate } from "react-router-dom";

function Mhci_table({ predictionData, handleDownload, prediction }) {
  const navigate = useNavigate();
  return (
    <div>
      <p className="mb-8">
        The MHC-I epitope prediction is performed using the netmhcpan-4.0
        method, which identifies potential peptide sequences from your provided
        protein sequence that are likely to bind to specific MHC-I molecules.
        The prediction focuses on a particular MHC-I allele (e.g., HLA-A*02:01),
        which represents a common version of MHC-I found in most populations.
        The length of the peptide fragments analyzed is typically set to 9 amino
        acids, as this is the most common size for peptides that fit into the
        MHC-I binding groove. These parameters together help identify the
        epitopes that may trigger an immune response, a key step in vaccine and
        therapeutic design.
        <a
          className="text-blue-800 cursor-pointer underline"
          onClick={(e) => {
            e.preventDefault();
            handleDownload(prediction.mhci.result, "MHCI");
          }}
        >
          Download MHCI prediction
        </a>
      </p>
      <Table columns="1fr 0.5fr 0.5fr 0.2fr 0.5fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Allele</div>
          <div>Seq Number</div>
          <div>Start</div>
          <div>End</div>
          <div>Length</div>
          <div>Peptide</div>
          <div>Core</div>
          <div>iCore</div>
          <div>IC50</div>
          <div>Percentile Rank</div>
        </Table.Header>

        <Table.Body
          data={predictionData}
          render={(obj, index) => (
            <Modal>
              <Modal.Open opens="prediction">
                <Table.Row type="epitope_prediction" role="row" key={index}>
                  <span>{obj["allele"]}</span>
                  <span>{obj["seq_num"]}</span>
                  <span>{obj["start"]}</span>
                  <span>{obj["end"]}</span>
                  <span>{obj["length"]}</span>
                  <span>{obj["peptide"]}</span>
                  <span>{obj["core"]}</span>
                  <span>{obj["icore"]}</span>
                  <span>{obj["ic50"]}</span>
                  <span>{obj["percentile_rank"]}</span>
                </Table.Row>
              </Modal.Open>

              <Modal.Window name="prediction">
                <Confirm
                  resource={obj}
                  onConfirm={() => {
                    navigate(`/build-mRNA?epitope=${obj.peptide}&type=MHCI`);
                  }}
                />
              </Modal.Window>
            </Modal>
          )}
        />
      </Table>
    </div>
  );
}

export default Mhci_table;
