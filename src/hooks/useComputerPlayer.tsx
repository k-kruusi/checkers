import { useContext } from 'react';
import { ComputerPlayerContext } from '../providers';

export const useComputerPlayer = () => {
  const context = useContext(ComputerPlayerContext);

  if (!context) {
    throw new Error('use computer player must be called within a use computer player provider');
  }

  return { ...context, };
};
