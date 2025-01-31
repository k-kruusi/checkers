export const theme = {
  colors: {
    grey: '#464646',
    ivory: '#FFFFF0',
    gold: '#DAA520',
    black: '#222222',
    red: '#e74c3c',
    green: 'green',
    blue: '#3399ff',
    blackBanner: 'rgba(34, 34, 34, 0.8)',
    redBanner: 'rgba(211, 76, 60, 0.8)',
  },
  size: {
    tileSize: 'calc(100vw * 0.0455)',
    tileSizeMedium: 'calc(100vw * 0.08)',
    tileSizeMobile: 'calc(100vw * 0.04)',
  },
  fonts: {
    amatic: 'Amatic SC, sans-serif',
  }
}

export const darkenColor = (col: string, amt: number): string => {
  let usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}