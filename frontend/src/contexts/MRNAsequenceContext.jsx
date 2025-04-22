import { createContext, useContext, useState } from "react";

const MRNAsequenceContext = createContext();

export const useMRNASequence = () => useContext(MRNAsequenceContext);

export const MRNAsequenceProvider = ({ children }) => {
  const [mrnaSequence, setMRNAsequence] = useState(null);

  return (
    <MRNAsequenceContext.Provider value={{ mrnaSequence, setMRNAsequence }}>
      {children}
    </MRNAsequenceContext.Provider>
  );
};
