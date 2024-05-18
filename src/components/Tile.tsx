import { Piece, TurnState } from "../schema"
import { isTileActive, isKing } from "../utils";


export const Tile = ({ piece, x, y, turn, handleMouseDown, handleMouseUp, handleMouseMove, highlightFunction }: {
  piece: Piece,
  x: number,
  y: number,
  turn: TurnState,
  handleMouseDown: (piece: Piece, x: number, y: number) => void,
  handleMouseUp: (x: number, y: number) => void,
  handleMouseMove: (piece: Piece, x: number, y: number) => void,
  highlightFunction: (x: number, y: number) => string,
}) => {

  let tileColor = "";

  switch (piece) {
    case Piece.Empty:
      break;
    case Piece.Black:
    case Piece.BlackKing:
      tileColor = "black";
      break;
    case Piece.Red:
    case Piece.RedKing:
      tileColor = "red";
      break;
  }

  const highlight = highlightFunction(x, y);
  const content = isKing(piece) ? "K" : "";

  const isActive = isTileActive(turn.phase, piece);

  return (<button onMouseDown={(e) => {
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
    style={{ backgroundColor: highlight }}>
    <div style={{ borderRadius: "50%", width: 100, height: 100, backgroundColor: tileColor, color: "white", display: "flex", justifyContent: "center", alignItems: "center", userSelect: "none" }}>{content}</div>
  </button>);
}