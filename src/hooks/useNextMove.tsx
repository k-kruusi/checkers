import { useContext } from 'react';
import { NextMoveInspectorContext } from '../providers';

export const useNextMove = () => {
  const context = useContext(NextMoveInspectorContext);
  if (!context) {
    throw new Error('next move must be called within a next move provider');
  }
  return context;
}
