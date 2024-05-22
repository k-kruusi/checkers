import { ReactNode, createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { BoardState, GamePhase } from '../schema';
import { Action, reducer } from '../reducer';
import { Timer, cloneState, formatTime } from '../utils';

export const CheckersContext = createContext<{
  state: BoardState;
  dispatch: React.Dispatch<Action>;
  blackTime: string;
  redTime: string;
} | null>(null);

export const CheckersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, cloneState());
  const { turn, winner } = state;

  const [blackTime, setBlackTime] = useState<string>('0:00');
  const [redTime, setRedTime] = useState<string>('0:00');

  const blackTimer = useMemo(() => new Timer(), []);
  const redTimer = useMemo(() => new Timer(), []);

  // logic for pausing and playing the timers
  useEffect(() => {
    if (turn.count === 0 && turn.phase === GamePhase.Black) {
      blackTimer.reset();
      blackTimer.pause();
      redTimer.reset();
      redTimer.pause();
      return;
    }

    if (winner) {
      blackTimer.pause();
      redTimer.pause();
    }
    switch (turn.phase) {
      case GamePhase.Black:
      case GamePhase.TransitionToBlack:
        blackTimer.start();
        redTimer.pause();
        break;
      case GamePhase.Red:
      case GamePhase.TransitionToRed:
        blackTimer.pause();
        redTimer.start();
        break;
    }
  }, [turn.phase, turn.count, blackTimer, redTimer, winner]);

  // logic for updating the time
  useEffect(() => {
    if (!winner) {
      const interval = setInterval(() => {
        setBlackTime(formatTime(blackTimer.getTime()));
        setRedTime(formatTime(redTimer.getTime()));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [blackTimer, redTimer, setBlackTime, setRedTime, winner]);

  return (
    <CheckersContext.Provider value={{ state, dispatch, blackTime, redTime }}>
      {children}
    </CheckersContext.Provider>
  );
};
