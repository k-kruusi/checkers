import { useMemo } from 'react';
import { useLayout } from '../../hooks';
import { Coord, TileData } from '../../schema';
import { theme } from '../../theme';



// empty tile that can receives drop events.
export const EmptyTile = ({ tile, isDragging, onDropTile, onMouseOver }: {
  tile: TileData,
  isDragging: Coord | null,
  onDropTile: (from: Coord, to: Coord) => void;
  onMouseOver: () => void;
}) => {
  const { isConstrainedWidth: isThin, isMobile, isLandscape } = useLayout();

  const style = useMemo(() => {
    const s = {
      width: isMobile && isLandscape ?
        theme.size.tileSizeMobile :
        isThin ?
          theme.size.tileSizeMedium :
          theme.size.tileSize,
      height: isMobile && isLandscape ?
        theme.size.tileSizeMobile :
        isThin ?
          theme.size.tileSizeMedium :
          theme.size.tileSize,
    };
    return s;
  }, [isThin, isMobile, isLandscape]);

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