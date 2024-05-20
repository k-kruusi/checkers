import { ReactNode, createContext, useMemo, useReducer } from 'react';
import { BoardState } from '../schema';
import { Action, reducer } from '../reducer';
import { Timer, cloneState } from '../utils';

export const CheckersContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<Action>;
  blackTimer: Timer;
  redTimer: Timer;
} | null>(null);

export const CheckersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, cloneState());

  const blackTimer = useMemo(() => new Timer(), []);
  const redTimer = useMemo(() => new Timer(), []);

  return (
    <CheckersContext.Provider value={{ state, dispatch, blackTimer, redTimer }}>
      {children}
    </CheckersContext.Provider>
  );
};
