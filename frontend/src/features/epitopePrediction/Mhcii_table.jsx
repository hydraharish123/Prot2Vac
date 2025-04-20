import Table from "../../ui/Table";
import Heading from "../../ui/Heading";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Mhcii_table({ predictionData }) {
  return (
    <StyledDiv>
      <div>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
        tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
        massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
        vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
        inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing
        elit.Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </div>
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
            <Table.Row role="row" key={index}>
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
          )}
        />
      </Table>
    </StyledDiv>
  );
}

export default Mhcii_table;
