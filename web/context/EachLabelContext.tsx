import React, { createContext, useState, ReactNode } from "react";

interface Pair {
  index: number;
  student1: number;
  student2: number;
}

interface EachLabelContextType {
  nextToPairs: Pair[];
  withInTwoSeatsPairs: Pair[];
  awayOneSeatsPairs: Pair[];
  awayTwoSeatsPairs: Pair[];
  setNextToPairs: (pairs: Pair[]) => void;
  setWithInTwoSeatsPairs: (pairs: Pair[]) => void;
  setAwayOneSeatsPairs: (pairs: Pair[]) => void;
  setAwayTwoSeatsPairs: (pairs: Pair[]) => void;
}

const EachLabelContext = createContext<EachLabelContextType | undefined>(undefined);

const EachLabelContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nextToPairs, setNextToPairs] = useState<Pair[]>([]);
  const [withInTwoSeatsPairs, setWithInTwoSeatsPairs] = useState<Pair[]>([]);
  const [awayOneSeatsPairs, setAwayOneSeatsPairs] = useState<Pair[]>([]);
  const [awayTwoSeatsPairs, setAwayTwoSeatsPairs] = useState<Pair[]>([]);

  return (
    <EachLabelContext.Provider value={{ nextToPairs, withInTwoSeatsPairs, awayOneSeatsPairs, awayTwoSeatsPairs, setNextToPairs, setWithInTwoSeatsPairs, setAwayOneSeatsPairs, setAwayTwoSeatsPairs }}>
      {children}
    </EachLabelContext.Provider>
  );
};

export { EachLabelContext, EachLabelContextProvider };
