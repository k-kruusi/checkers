import { useContext } from 'react';
import { ComputerPlayerContext } from '../providers';

export const useComputerPlayer = () => {
  const context = useContext(ComputerPlayerContext);

  if (!context) {
    throw new Error('useCheckers must be used within a CheckersProvider');
  }

  return { ...context, };
};
