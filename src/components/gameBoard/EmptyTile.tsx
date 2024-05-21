import { useMemo } from 'react';
import { useLayout } from '../../hooks';
import { Coord, TileData } from '../../schema';
import { theme } from '../../theme';

const tileStyle = {
  width: theme.size.tileSize,
  height: theme.size.tileSize,
};

// empty tile that can receives drop events.
export const EmptyTile = ({ tile, isDragging, onDropTile, onMouseOver }: {
  tile: TileData,
  isDragging: Coord | null,
  onDropTile: (from: Coord, to: Coord) => void;
  onMouseOver: () => void;
}) => {
  const isThin = useLayout();

  const style = useMemo(() => {
    let s: React.CSSProperties = tileStyle;
    if (isThin) {
      s = {
        ...tileStyle,
        width: theme.size.tileSizeMobile,
        height: theme.size.tileSizeMobile
      };
    }
    return s;
  }, [isThin]);

  const handleDropTile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const isOtherActive = e.dataTransfer.getData('isActive') === 'true';
    if (!isOtherActive) {
      return;
    }
    const otherX = parseInt(e.dataTransfer.getData('x'));
    const otherY = parseInt(e.dataTransfer.getData('y'));
    const from: Coord = { x: otherX, y: otherY };
    const to = tile.coord;
    if (from.x !== to.x || from.y !== to.y) {
      onDropTile(from, to);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      onDropTile(isDragging, tile.coord);
    }
  }

  return (<div
    style={style}
    onDragOver={handleDragOver}
    onDrop={handleDropTile}
    onTouchEnd={handleTouchEnd}
    onMouseOver={onMouseOver}
  />);
};