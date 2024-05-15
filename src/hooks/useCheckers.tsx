import { useContext } from 'react';
import { CheckersContext } from '../providers';

export const useCheckers = () => {
  const context = useContext(CheckersContext);
  if (!context) {
    throw new Error('useCheckers must be used within a CheckersProvider');
  }
  return context;
};