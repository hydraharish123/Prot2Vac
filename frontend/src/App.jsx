import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import AppLayout from "./ui/AppLayout";
import Upload from "./pages/Upload";
import { SequenceProvider } from "./contexts/SequenceContext";
import PredictEpitope from "./pages/PredictEpitope";
import BuildmRNA from "./pages/BuildmRNA";
import { MRNAsequenceProvider } from "./contexts/MRNAsequenceContext";
import Results from "./pages/Results";

function App() {
  return (
    <>
      <GlobalStyles />
      <MRNAsequenceProvider>
        <SequenceProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<HomePage />} />
                <Route path="upload" element={<Upload />} />
                <Route path="predict-epitope" element={<PredictEpitope />} />
                <Route path="build-mRNA" element={<BuildmRNA />} />
                <Route path="results" element={<Results />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SequenceProvider>
      </MRNAsequenceProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
