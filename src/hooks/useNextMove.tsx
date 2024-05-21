import { useContext } from 'react';
import { NextMoveInspectorContext } from '../providers';

export const useNextMove = () => {
  const context = useContext(NextMoveInspectorContext);
  if (!context) {
    throw new Error('useCheckers must be used within a CheckersProvider');
  }
  return context;
}
