import styled from "styled-components";
import Logo from "./Logo";
import Heading from "./Heading";

const StyledHeader = styled.header`
  background-color: var(--color-brand-400);
  padding: 2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <Heading as="h1">Prot2Vac</Heading>
    </StyledHeader>
  );
}

export default Header;
