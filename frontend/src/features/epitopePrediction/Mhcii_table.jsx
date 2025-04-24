import Table from "../../ui/Table";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Confirm from "../../ui/Confirm";
import { useNavigate } from "react-router-dom";

function Mhcii_table({ predictionData, handleDownload, prediction }) {
  const navigate = useNavigate();
  return (
    <div>
      <p className="mb-8">
        The MHC-II epitope prediction is performed using the nn_align method,
        which is designed to identify peptide sequences from your provided
        protein sequence that are likely to bind to MHC-II molecules. The
        prediction is based on a specific MHC-II allele, such as HLA-DRB1*07:01,
        which represents a common version of MHC-II found in certain
        populations. The peptides predicted by this method are typically around
        15 amino acids in length, as this is the most common size for MHC-II
        binding peptides. These parameters help identify the regions of the
        protein that may be presented by MHC-II molecules to trigger immune
        responses, aiding in vaccine and therapeutic design.
        <a
          className="text-blue-800 cursor-pointer underline"
          onClick={(e) => {
            e.preventDefault();
            handleDownload(prediction.mhcii.result, "MHCII");
          }}
        >
          Download MHCII prediction
        </a>
      </p>
      <Table columns="1fr 0.5fr 0.5fr 0.2fr 0.5fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Allele</div>
          <div>Seq Number</div>
          <div>Start</div>
          <div>End</div>
          <div>Length</div>
          <div>core_peptide</div>
          <div>peptide </div>
          <div>ic50</div>
          <div>rank</div>
          <div>adjusted_rank</div>
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
                  <span>{obj["core_peptide"]}</span>
                  <span>{obj["peptide"]}</span>
                  <span>{obj["ic50"]}</span>
                  <span>{obj["rank"]}</span>
                  <span>{obj["adjusted_rank"]}</span>
                </Table.Row>
              </Modal.Open>

              <Modal.Window name="prediction">
                <Confirm
                  resource={obj}
                  onConfirm={() => {
                    navigate(`/build-mRNA?epitope=${obj.peptide}&type=MHCII`);
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

export default Mhcii_table;
