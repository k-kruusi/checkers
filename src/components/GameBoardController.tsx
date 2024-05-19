import React, { useCallback, useState } from 'react';
import { useCheckers, useNextMove } from '../hooks';
import { Coord, MoveResult, Piece } from '../schema';
import { theme } from '../theme';
import { ActionType } from '../reducer';
import { TileContainer } from './TileContainer';
import { BannerController } from './BannerController';
import { ResetButton } from './ResetButton';



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
  const { inspect, potentials } = useNextMove();
  const [isDragging, setIsDragging] = useState<Coord | null>(null);

  const handleDrop = useCallback((from: Coord, to: Coord) => {
    const chosen = potentials.find((p) => p.coord.x === to.x && p.coord.y === to.y);
    if (chosen) {
      dispatch({
        type: ActionType.MOVE_PIECE,
        from,
        to,
        piece: board[from.y][from.x],
        potentials: [...potentials],
        result: chosen.didJump ? MoveResult.Jump : MoveResult.Shift,
      });
    }
    else {
      console.log('not in chosen');
    }
    setIsDragging(null);
  }, [potentials, dispatch]);

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

  const getTileColor = useCallback((x: number, y: number) => {
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
  }, [potentials]);

  return (
    <>
      <div style={gameBoardContainerStyle} onDragEnd={handleDragEnd}>
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
        <BannerController />
      </div>
      <ResetButton />
    </>
  );
};
