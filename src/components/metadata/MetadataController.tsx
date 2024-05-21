import { ReactNode, useEffect, useState } from "react";
import { useCheckers, useLayout } from "../../hooks";
import { GamePhase, Piece } from "../../schema";
import { formatTime, getPieces, isTurn } from "../../utils";
import { VerticalLayout } from "./VerticalLayout";
import { HorizontalLayout } from "./HorizontalLayout";

// handles the timer logic, and board layout wrapping the info pannels and the board.
export const MetadataController = ({ children }: { children?: ReactNode }) => {
  const [blackTime, setBlackTime] = useState<string>("0:00");
  const [redTime, setRedTime] = useState<string>("0:00");

  const { blackTimer, redTimer, state } = useCheckers();
  const { turn, board, winner } = state;
  const isThin = useLayout();

  const { red, black } = getPieces(board);
  const count = { black: black.length, red: red.length };
  const isBlackTurn = isTurn(turn.phase, Piece.Black);

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

  useEffect(() => {
    if (!winner) {
      const interval = setInterval(() => {
        setBlackTime(formatTime(blackTimer.getTime()));
        setRedTime(formatTime(redTimer.getTime()));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [blackTimer, redTimer, setBlackTime, setRedTime, winner]);

  return isThin ?
    (<VerticalLayout
      blackTime={blackTime}
      redTime={redTime}
      count={count}
      isBlackTurn={isBlackTurn}>{children}</VerticalLayout>) :
    (<HorizontalLayout
      blackTime={blackTime}
      redTime={redTime}
      count={count}
      isBlackTurn={isBlackTurn}>{children}</HorizontalLayout>);
}
