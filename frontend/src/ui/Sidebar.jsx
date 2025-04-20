import styled from "styled-components";

import Heading from "./Heading";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  flex: 1;
  padding-right: 1rem;
  margin-top: 2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Heading
        as="h2"
        style={{
          textAlign: "center",
        }}
      >
        Network Details
      </Heading>
    </StyledSidebar>
  );
}

export default Sidebar;
