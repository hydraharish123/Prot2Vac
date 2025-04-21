import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function Confirm({ resource, onConfirm, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading type="h2">Confirm Prediction</Heading>

      <p>
        Are you sure you want to proceed with this prediction?
        <strong>Epitope sequence</strong>: {resource.peptide} starting at
        position {resource.start} and ending at {resource.end}
      </p>

      <div>
        <Button size="small" variation="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button size="small" variation="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default Confirm;
