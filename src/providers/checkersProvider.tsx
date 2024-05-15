import React, { ReactNode, createContext, useReducer } from 'react';
import { BoardState, reducer, initialState } from '../schema';
import { Action } from '../actions';

export const CheckersContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const CheckersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CheckersContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckersContext.Provider>
  );
};
