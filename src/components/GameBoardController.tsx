

import React, { useCallback, useEffect, useState } from 'react';
import { useCheckers, useNextMove } from '../hooks';
import { ActionType } from '../reducer';
import { Coord, MoveResult, Piece } from '../schema';
import { TileContainer } from './TileContainer';
import { BannerController } from './BannerController';
import { ResetButton } from './ResetButton';
import { theme } from '../theme';
import { DraggedTile } from './DraggedTile';

const gameBoardStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, auto)',
  gap: 0,
  border: `4px solid ${theme.colors.gold}`,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: 4,
  padding: 4,
}

const gameBoardContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20
}

export const GameBoardController: React.FC = () => {
  const { state, dispatch } = useCheckers();
  const { board, turn } = state;
  const { inspect, potentials, clear } = useNextMove();

  const [dragStart, setDragStart] = useState<Coord | null>(null);
  const [dragPieceColor, setDragPieceColor] = useState<Piece | null>(null);
  const [dropZone, setDropZone] = useState<Coord | null>(null);
  const [dragPiece, setDragPiece] = useState<Piece | null>(null);
  const [position, setPosition] = useState<Coord | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      console.log(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setPosition]);

  const handleCellClick = useCallback((piece: Piece, x: number, y: number) => {
    if (piece === Piece.Empty) {
      return;
    }
    setDragPiece(piece);
    setDragStart({ x, y });
    inspect({ piece, coord: { x, y } });
    setDragPieceColor(piece);
  }, [inspect, setDragStart, setDragPieceColor]);

  const handleCellDragEnd = useCallback((x: number, y: number) => {
    setDragPiece(null);
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

  const getTileColor = useCallback((x: number, y: number) => {
    if (dragStart !== null) {
      if (dropZone && x === dropZone.x && y === dropZone.y) {
        return potentials.some(p => p.coord.x === dropZone.x && p.coord.y === dropZone.y) ?
          theme.colors.green :
          theme.colors.gold;
      }
    }
    const isOddRow = y % 2 === 0 ? false : true;
    const isOddTile = x % 2 === 0 ? false : true;
    const defaultTileBackground = isOddRow ?
      isOddTile ?
        theme.colors.ivory :
        theme.colors.grey :
      !isOddTile ?
        theme.colors.ivory :
        theme.colors.grey;

    return potentials.some(p => p.coord.x === x && p.coord.y === y) ?
      theme.colors.blue :
      defaultTileBackground;
  }, [dragStart, dropZone, potentials]);

  return (
    <>
      <div style={gameBoardContainerStyle}>
        <div style={gameBoardStyle}>
          {
            board.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                return (
                  <div key={rowIndex + "-" + colIndex} >
                    <TileContainer
                      piece={cell}
                      x={colIndex}
                      y={rowIndex}
                      turn={turn}
                      handleMouseDown={handleCellClick}
                      handleMouseUp={handleCellDragEnd}
                      handleMouseMove={handleHoverAndDrag}
                      getTileColor={getTileColor}
                    />
                  </div>
                )
              })
            ))
          }
        </div>
        <BannerController />
      </div>
      <ResetButton />
      <DraggedTile piece={dragPiece} position={position} />
    </>
  );
};