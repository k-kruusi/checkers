import { useContext, useMemo, useReducer, useState } from 'react';
import { CheckersContext } from '../providers';
import { reducer } from '../reducer';
import { cloneState, getPieces } from '../utils';

export const useCheckers = () => {
  const context = useContext(CheckersContext);

  if (!context) {
    throw new Error('useCheckers must be used within a CheckersProvider');
  }

  return { ...context, };
};


export const useCheckersHook = () => {
  const [state, dispatch] = useReducer(reducer, cloneState());

  return { state, dispatch };
}