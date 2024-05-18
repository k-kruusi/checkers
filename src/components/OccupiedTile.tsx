import { Piece } from "../schema";
import { darkenColor, theme } from "../theme";
import { colorForPiece, isKing } from "../utils";

export const OccupiedTile = ({ piece, isDragged }: { piece: Piece, isDragged: boolean }) => {
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
    pointerEvents: isDragged ? "none" : "auto",
    zIndex: 1
  };

  const content = isKing(piece) ? "K" : "";
  return (<div style={fullTileStyle}>
    {content}
  </div>);
}