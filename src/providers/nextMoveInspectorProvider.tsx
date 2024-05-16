import { createContext } from "react";
import { Outcome, TileData } from "../schema";
import { useNextMoveHook } from '../hooks';


export const NextMoveInspectorContext = createContext<{
  inspect: (maybe: TileData) => void;
  potentials: Outcome[];
  clear: () => void;
} | null>(null);


export const NextMoveInspectorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { inspect, potentials, clear } = useNextMoveHook();

  return (
    <NextMoveInspectorContext.Provider value={{ inspect, potentials, clear }}>
      {children}
    </NextMoveInspectorContext.Provider>
  );
};


