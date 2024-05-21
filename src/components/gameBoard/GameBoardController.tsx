import React, { useCallback, useState } from 'react';
import { useCheckers, useNextMove } from '../../hooks';
import { Coord, MoveResult, Piece } from '../../schema';
import { theme } from '../../theme';
import { ActionType } from '../../reducer';
import { TileColor, TileController } from './TileController';

const gameBoardStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, auto)',
  gap: 0,
  border: `4px solid ${theme.colors.gold}`,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: 4,
  padding: 4,
};

const gameBoardContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: "20px 20px 20px 20px",
};

// Big picture manages the state of the board, passes appropriate methods to the tiles
export const GameBoardController: React.FC = () => {
  const { state, dispatch } = useCheckers();
  const { board } = state;
  const { inspect, potentials, clear } = useNextMove();
  const [isDragging, setIsDragging] = useState<Coord | null>(null);

  const handleDrop = useCallback((from: Coord, to: Coord) => {
    const validMove = potentials.find((p) => p.coord.x === to.x && p.coord.y === to.y);
    if (!validMove) {
      console.log('Invalid move attempted.');
      setIsDragging(null);
      clear();
      return;
    }

    dispatch({
      type: ActionType.MOVE_PIECE,
      from,
      to,
      piece: board[from.y][from.x],
      potentials: [...potentials],
      result: validMove.didJump ? MoveResult.Jump : MoveResult.Shift,
      timestamp: new Date().toISOString(),
    });

    setIsDragging(null);
    clear();
  }, [potentials, board, dispatch, clear, setIsDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(null);
  }, [setIsDragging]);

  const handleHover = useCallback((piece: Piece, coord: Coord) => {
    !isDragging && inspect({ piece, coord });
  }, [isDragging, inspect]);

  const handleDragStart = useCallback((piece: Piece, coord: Coord) => {
    setIsDragging(coord);
    inspect({ piece, coord });
  }, [setIsDragging, inspect]);

  const getTileColor = useCallback((x: number, y: number): TileColor => {
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
      { color: defaultTileBackground, highlight: theme.colors.blue } :
      { color: defaultTileBackground, highlight: null };
  }, [potentials]);

  return (
    <>
      <div style={gameBoardContainerStyle} onDragEnd={handleDragEnd}>
        <div style={gameBoardStyle}>
          {
            board.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                return (
                  <div key={rowIndex + '-' + colIndex} >
                    <TileController
                      piece={cell}
                      x={colIndex}
                      y={rowIndex}
                      handleDragStart={handleDragStart}
                      handleDrop={handleDrop}
                      handleDragEnd={handleDragEnd}
                      handleHover={handleHover}
                      getTileColor={getTileColor}
                      isDragging={isDragging}
                    />
                  </div>
                )
              })
            ))
          }
        </div>
      </div>
    </>
  );
};
