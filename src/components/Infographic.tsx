import { useMemo } from 'react';
import { ReactComponent as TimeIcon } from '../assets/icons/timer.svg';
import { ReactComponent as PiecesIcon } from '../assets/icons/pieces.svg';
import { theme } from '../theme';
import { Piece } from '../schema';
import { useCheckers } from '../hooks';
import { getPieces, getString, isTurn } from '../utils';

const outterContainer: React.CSSProperties = {
  border: `4px solid ${theme.colors.gold}`,
  borderRadius: 5,
  width: 'fit-content',
  minWidth: 85,
  userSelect: 'none',
  fontFamily: theme.fonts.amatic,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
  textAlign: 'left',
  fontSize: 18,
};

const headerStyle: React.CSSProperties = {
  fontSize: 18,
  textAlign: 'center'
};

// renders the player data
export const InfoGraphic = ({ piece }: {
  piece: Piece
}) => {

  const { state, blackTime, redTime } = useCheckers();
  const { board, turn } = state;
  const { red, black } = getPieces(board);
  const isBlackTurn = isTurn(turn.phase, Piece.Black);
  const isMyTurn = isBlackTurn && piece === Piece.Black || !isBlackTurn && piece === Piece.Red;
  const myTitle = piece === Piece.Black ? getString('black') : getString('red');
  const myTime = piece === Piece.Black ? blackTime : redTime;
  const myCount = piece === Piece.Black ? black.length : red.length;

  const innerContainer: React.CSSProperties = useMemo(() => {
    return {
      margin: 5,
      padding: '5px 10px',
      backgroundColor: isMyTurn ? theme.colors.ivory : theme.colors.grey,
      fontWeight: 'bold',
      textAlign: 'left',
    };
  }, [isMyTurn]);

  return (<div style={outterContainer}>
    <div style={innerContainer}>
      <div><h1 style={headerStyle}>{myTitle}</h1></div>
      <div style={rowStyle}><TimeIcon /> <p>{myTime}</p></div>
      <div style={rowStyle}><PiecesIcon /> <p>{myCount}</p></div>
    </div>
  </div>);
};