import { useEffect, useState } from "react";
import { Coord, Piece } from "../schema"
import { PieceTile } from "./TileContainer"

export const DraggedTile = ({ piece, position }: { piece: Piece | null, position: Coord | null }) => {

  if (!piece || !position) {
    return null;
  }


  return (<>
    <div style={{
      position: 'fixed',
      top: position.y,
      left: position.x,
      transform: 'translate(-50%, -50%)',
      opacity: '50%'
    }}
    >
      <PieceTile piece={piece} isDragged={true} />
    </div>
  </>
  );
}