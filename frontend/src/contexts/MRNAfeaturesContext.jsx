import { createContext, useContext, useState } from "react";

const MRNAfeaturesContext = createContext();

export const useMRNAfeatures = () => useContext(MRNAfeaturesContext);

export const MRNAfeaturesProvider = ({ children }) => {
  const [spacer, setSpacer] = useState("");
  const [adjuvant, setAdjuvant] = useState("");
  const [signal, setSignal] = useState("");
  const [antigen, setAntigen] = useState("");
  const [epitopeSeq, setEpitopeSeq] = useState("");
  const [epitopeType, setEpitopeType] = useState("");

  return (
    <MRNAfeaturesContext.Provider
      value={{
        spacer,
        setSpacer,
        adjuvant,
        setAdjuvant,
        signal,
        setSignal,
        antigen,
        setAntigen,
        epitopeSeq,
        setEpitopeSeq,
        epitopeType,
        setEpitopeType,
      }}
    >
      {children}
    </MRNAfeaturesContext.Provider>
  );
};
