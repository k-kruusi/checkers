import { Piece, Coord, TurnState } from '../schema';
import { isTileActive } from '../utils';
import { EmptyTile } from './EmptyTile';
import { OccupiedTile } from './OccupiedTile';

interface TileContainerProps {
  piece: Piece;
  x: number;
  y: number;
  turn: TurnState;
  handleDrop: (from: Coord, to: Coord) => void;
  handleDragStart: (piece: Piece, coord: Coord) => void;
  handleHover: (piece: Piece, coord: Coord) => void;
  getTileColor: (x: number, y: number) => string;
  isDragging: Coord | null;
}

export const TileContainer: React.FC<TileContainerProps> = ({
  piece,
  x,
  y,
  turn,
  handleDrop,
  handleDragStart,
  handleHover,
  getTileColor,
  isDragging,
}) => {

  const isActive = isTileActive(turn.phase, piece);

  const containerStyle: React.CSSProperties = {
    backgroundColor: getTileColor(x, y),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    padding: 4
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('isActive', isActive.toString());
    e.dataTransfer.setData('x', x.toString());
    e.dataTransfer.setData('y', y.toString());
    handleDragStart(piece, { x, y });
  };

  const handleDropTile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const isOtherActive = e.dataTransfer.getData('isActive') === 'true';
    if (!isOtherActive) {
      return;
    }
    const otherX = parseInt(e.dataTransfer.getData('x'));
    const otherY = parseInt(e.dataTransfer.getData('y'));
    const from: Coord = { x: otherX, y: otherY };
    const to = { x, y };
    if (from.x !== to.x || from.y !== to.y) {
      handleDrop(from, to);
    }
  };

  const onMouseOver = () => {
    isActive && handleHover(piece, { x, y })
  }

  return (
    <div style={containerStyle}>
      {piece === Piece.Empty ? (
        <EmptyTile handleDropTile={handleDropTile} onMouseOver={onMouseOver} />
      ) : (
        <OccupiedTile piece={piece} coord={{ x, y }} isDragging={isDragging} isActive={isActive} onDragStart={onDragStart} onMouseOver={onMouseOver} />
      )}
    </div >
  );
};
