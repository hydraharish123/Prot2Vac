import styled from "styled-components";
import Header from "../ui/Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const HeaderContainer = styled.header`
  grid-row: 1;
`;

const Main = styled.main`
  grid-row: 2;
  background-color: var(--color-grey-50);
  padding: 4rem 2.4rem 6.4rem;
  overflow-y: auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
