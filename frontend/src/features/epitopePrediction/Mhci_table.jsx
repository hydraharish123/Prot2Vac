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
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
        tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
        massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
        vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
        inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
        elit.Lorem ipsum dolor sit amet consectetur adipiscing elit.
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
