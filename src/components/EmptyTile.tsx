
const style = {
  width: 'calc(100vw * 0.0655)',
  height: 'calc(100vw * 0.0655)',
  borderRadius: '50%',
}

export const EmptyTile = ({ handleDropTile, onMouseOver }: {
  handleDropTile: (e: React.DragEvent<HTMLDivElement>) => void;
  onMouseOver: () => void;
}) => {

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return <div
    style={style}
    onDragOver={handleDragOver}
    onDrop={handleDropTile}
    onMouseOver={onMouseOver}
  />
}