import { Piece, TurnState } from "../schema"
import { isTileActive, nameForTile, } from "../utils";
import { EmptyTile } from "./EmptyTile";
import { OccupiedTile } from "./OccupiedTile";


export const TileContainer = ({ piece, x, y, turn, handleMouseDown, handleMouseUp, handleMouseMove, getTileColor }: {
  piece: Piece,
  x: number,
  y: number,
  turn: TurnState,
  handleMouseDown: (piece: Piece, x: number, y: number) => void,
  handleMouseUp: (x: number, y: number) => void,
  handleMouseMove: (piece: Piece, x: number, y: number) => void,
  getTileColor: (x: number, y: number) => string,
}) => {

  const backgroundColor = getTileColor(x, y);
  const isActive = isTileActive(turn.phase, piece);
  const containerStyle: React.CSSProperties = { backgroundColor: backgroundColor, padding: 4 }
  const ariaLabel = `tile(${x},${y}):${nameForTile(piece)}`;

  const content = piece === Piece.Empty ?
    <EmptyTile piece={piece} /> :
    <OccupiedTile piece={piece} isDragged={false} />;

  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation();
        isActive && handleMouseDown(piece, x, y)
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        isActive && handleMouseUp(x, y)
      }}
      onMouseMove={(e) => {
        isActive && handleMouseMove(piece, x, y)
      }}
      style={containerStyle}
      aria-label={ariaLabel}
    >
      {content}
    </div >
  );
}



