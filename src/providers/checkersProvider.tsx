import { ReactNode, createContext } from 'react';
import { BoardState } from '../schema';
import { Action } from '../reducer';
import { useCheckersHook, } from '../hooks';

export const CheckersContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<Action>;
  saveCurrentState: () => void;
  loadLastSave: () => void;
} | null>(null);

export const CheckersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch, saveCurrentState, loadLastSave } = useCheckersHook();

  return (
    <CheckersContext.Provider value={{ state, dispatch, saveCurrentState, loadLastSave }}>
      {children}
    </CheckersContext.Provider>
  );
};
