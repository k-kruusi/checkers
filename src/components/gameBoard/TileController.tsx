import { useCallback, useMemo } from 'react';
import { useCheckers } from '../../hooks';
import { Piece, Coord } from '../../schema';
import { isComputerTurn, isTileActive } from '../../utils';
import { EmptyTile } from './EmptyTile';
import { OccupiedTile } from './OccupiedTile';
import { theme } from '../../theme';

export type TileColor = {
  color: string;
  highlight: string | null;
};

interface TileContainerProps {
  piece: Piece;
  x: number;
  y: number;
  handleDrop: (from: Coord, to: Coord) => void;
  handleDragStart: (piece: Piece, coord: Coord) => void;
  handleDragEnd: () => void;
  handleHover: (piece: Piece, coord: Coord) => void;
  getTileColor: (x: number, y: number) => TileColor;
  isDragging: Coord | null;
};

export const TileController: React.FC<TileContainerProps> = ({
  piece,
  x,
  y,
  handleDrop,
  handleDragStart,
  handleHover,
  getTileColor,
  isDragging,
}) => {
  const { state } = useCheckers();
  const { turn, players } = state;
  const isCompTurn = isComputerTurn(turn.phase, players);
  const isActive = isTileActive(turn.phase, piece);
  const tile = { piece: piece, coord: { x, y } };

  const containerStyle: React.CSSProperties = useMemo(() => {
    const { color, highlight } = getTileColor(x, y);
    return {
      backgroundColor: color,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      padding: 4,
      boxShadow: highlight ? `inset 0 0 10px ${theme.colors.blue}` : ''
    };
  }, [getTileColor, x, y]);

  const handleMouseOver = useCallback(() => {
    if (isCompTurn) {
      return;
    }
    isActive && handleHover(piece, { x, y });
  }, [isCompTurn, isActive, piece, x, y, handleHover]);

  return (
    <div style={containerStyle}>
      {piece === Piece.Empty ? (
        <EmptyTile tile={tile} isDragging={isDragging} onDropTile={handleDrop} onMouseOver={handleMouseOver} />
      ) : (
        <OccupiedTile piece={piece} coord={{ x, y }} isDragging={isDragging} isActive={isActive} onDragStart={handleDragStart} onMouseOver={handleMouseOver} />
      )}
    </div >
  );
};
