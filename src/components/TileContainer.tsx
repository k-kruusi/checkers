import { Piece, TurnState } from "../schema"
import { darkenColor, theme } from "../theme";
import { isTileActive, isKing, nameForTile, colorForPiece } from "../utils";

const EmptyTile = ({ piece }: { piece: Piece }) => {
  const tileColor = colorForPiece(piece);
  const emptyTileStyle: React.CSSProperties = {
    borderRadius: "50%",
    width: 'calc(100vw * 0.0625)',
    height: 'calc(100vw * 0.0625)',
    backgroundColor: tileColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none"
  };
  return <div style={emptyTileStyle} />;
}

export const PieceTile = ({ piece }: { piece: Piece }) => {
  const pieceColor = colorForPiece(piece);
  const fullTileStyle: React.CSSProperties = {
    borderRadius: "50%",
    width: 'calc(100vw * 0.0625)',
    height: 'calc(100vw * 0.0625)',
    background: `radial-gradient(circle, ${pieceColor} 20%, ${darkenColor(pieceColor, 0.2)} 70%)`,
    color: theme.colors.ivory,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    pointerEvents: "auto",
    zIndex: 1
  };

  const content = isKing(piece) ? "K" : "";
  return (<div style={fullTileStyle}>
    {content}
  </div>);
}

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
    <PieceTile piece={piece} />;

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
        e.stopPropagation();
        isActive && handleMouseMove(piece, x, y)
      }}
      style={containerStyle}
      aria-label={ariaLabel}
    >
      {content}
    </div >
  );
}



