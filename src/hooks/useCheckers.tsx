import { useContext, useReducer, useState } from 'react';
import { CheckersContext } from '../providers';
import { ActionType, reducer } from '../reducer';
import { BoardState, initialState } from '../schema';
import { cloneInitialState } from '../utils/boardUtilities';

export const useCheckers = () => {
  const context = useContext(CheckersContext);
  if (!context) {
    throw new Error('useCheckers must be used within a CheckersProvider');
  }
  return context;
};


export const useCheckersHook = () => {
  const [state, dispatch] = useReducer(reducer, cloneInitialState());

  const [savedState, setSavedState] = useState<BoardState | null>(null);

  const saveCurrentState = () => {
    setSavedState(state);
  }

  const loadLastSave = () => {
    if (!savedState) {
      return;
    }
    dispatch({ type: ActionType.LOAD_STATE, state: savedState })
  }

  return { state, dispatch, saveCurrentState, loadLastSave };
}