

import React, { useCallback, useState } from 'react';
import { useCheckers, useNextMove } from '../hooks';
import { ActionType } from '../reducer';
import { Coord, MoveResult, Piece } from '../schema';
import { Tile } from './Tile';
import { BannerController } from './BannerController';
import { ResetButton } from './ResetButton';


export const GameBoardController: React.FC = () => {
  const { state, dispatch } = useCheckers();
  const { board, turn } = state;
  const { inspect, potentials, clear } = useNextMove();

  const [dragStart, setDragStart] = useState<Coord | null>(null);
  const [dragPieceColor, setDragPieceColor] = useState<Piece | null>(null);
  const [dropZone, setDropZone] = useState<Coord | null>(null);

  const handleCellClick = useCallback((piece: Piece, x: number, y: number) => {
    if (piece === Piece.Empty) {
      return;
    }
    setDragStart({ x, y });
    inspect({ piece, coord: { x, y } });
    setDragPieceColor(piece);
  }, [inspect, setDragStart, setDragPieceColor]);

  const handleCellDragEnd = useCallback((x: number, y: number) => {
    if (dragStart && dropZone && dragPieceColor && potentials) {
      const chosen = potentials.find((p) => p.coord.x === dropZone.x && p.coord.y === dropZone.y);
      if (!chosen) {
        return;
      }
      dispatch({
        type: ActionType.MOVE_PIECE,
        from: dragStart,
        to: dropZone,
        piece: dragPieceColor,
        potentials: [...potentials],
        result: chosen.didJump ? MoveResult.Jump : MoveResult.Shift,
      });
    }
    setDragStart(null);
    setDragPieceColor(null);
    setDropZone(null);
    clear();
  }, [dragStart, dropZone, dragPieceColor, potentials, dispatch, setDragStart, setDragPieceColor, setDropZone, clear]);

  const handleHoverAndDrag = useCallback((piece: Piece, x: number, y: number) => {
    if (dragStart !== null) {
      setDropZone({ x, y });
      return;
    }
    // this updates potentials
    inspect({ piece, coord: { x, y } });
  }, [dragStart, setDropZone, inspect]);

  const highlight = useCallback((x: number, y: number) => {
    if (dragStart !== null) {
      if (dropZone && x === dropZone.x && y === dropZone.y) {
        return potentials.some(p => p.coord.x === dropZone.x && p.coord.y === dropZone.y) ? 'green' : 'orange';
      }
    }
    return potentials.some(p => p.coord.x === x && p.coord.y === y) ? "blue" : "";
  }, [dragStart, dropZone, potentials]);

  return (
    <>
      <div style={{ padding: 10 }}>
        <ResetButton />
      </div>
      <div className="game-board" style={{ border: "3px solid black", width: "fit-content", margin: "auto auto", position: "relative" }}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row" style={{ display: "flex", flexDirection: "row" }}>
            {row.map((cell, colIndex) => {
              return (
                <div key={rowIndex + "-" + colIndex} style={{ border: "1px solid black" }}>
                  <Tile
                    piece={cell}
                    x={colIndex}
                    y={rowIndex}
                    turn={turn}
                    handleMouseDown={handleCellClick}
                    handleMouseUp={handleCellDragEnd}
                    handleMouseMove={handleHoverAndDrag}
                    highlightFunction={highlight}
                  />
                </div>
              )
            })}
          </div>
        ))}
        <BannerController />
      </div>
    </>
  );
};