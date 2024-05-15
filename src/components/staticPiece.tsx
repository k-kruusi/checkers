import { Piece } from "../schema"


export const StaticPiece = ({ piece }: { piece: Piece }) => {
  const color = piece !== Piece.Empty ? piece === Piece.Black ? 'black' : 'red' : '';
  return <div style={{ borderRadius: "50%", width: 100, height: 100, backgroundColor: color }}></div>
}