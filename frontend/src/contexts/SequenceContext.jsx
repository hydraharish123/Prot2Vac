import { createContext, useContext, useState } from "react";

const SequenceContext = createContext();

export const useSequence = () => useContext(SequenceContext);

export const SequenceProvider = ({ children }) => {
  const [sequence, setSequence] = useState(null);

  return (
    <SequenceContext.Provider value={{ sequence, setSequence }}>
      {children}
    </SequenceContext.Provider>
  );
};
