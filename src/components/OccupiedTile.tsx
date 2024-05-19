import { Coord, Piece } from "../schema";
import { theme } from "../theme";
import { isBlack, isKing } from "../utils";




export type OccupiedTileProps = {
  piece: Piece;
  coord: Coord;
  isDragging: Coord | null;
  isActive: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onMouseOver: () => void;
}

export const OccupiedTile: React.FC<OccupiedTileProps> = ({ piece, coord, isDragging, isActive, onDragStart, onMouseOver }) => {
  const shouldFade = isDragging && isDragging.x === coord.x && isDragging.y === coord.y;
  const content = isKing(piece) ? "K" : "";

  const style = {
    width: 'calc(100vw * 0.0655)',
    height: 'calc(100vw * 0.0655)',
    backgroundColor: isBlack(piece) ? theme.colors.black : theme.colors.red,
    borderRadius: '50%',
    opacity: shouldFade ? 0.5 : 1
  }

  return (
    <div
      style={style}
      draggable={isActive && !isDragging}
      onDragStart={onDragStart}
      onMouseMove={onMouseOver}
    >
      {content}
    </div>
  );
}