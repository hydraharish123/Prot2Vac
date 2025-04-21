import styled from "styled-components";

const StyledRadio = styled.input`
  margin-right: 0.8rem;
  accent-color: var(--color-brand-500);
  outline: none;

  &:focus-within {
    outline: none;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 1rem 1rem;
  border: 1px solid var(--color-brand-500);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  margin-bottom: 0.5rem;
  cursor: pointer;
  gap: 0.4rem;
`;

function RadioGroup({ options, value, onChange, name }) {
  return (
    <div>
      {options.map((option) => (
        <RadioLabel key={option.value}>
          <StyledRadio
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
          <div className="flex flex-col gap-2">
            <p>
              <strong>{option.label}</strong>
            </p>
            <p>{option.value}</p>
          </div>
        </RadioLabel>
      ))}
    </div>
  );
}

export default RadioGroup;
