import { useState, useEffect } from 'react';

export const useLayout = (breakpoint = 800) => {
  const [isConstrainedWidth, setIsConstrainedWidth] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsConstrainedWidth(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isConstrainedWidth;
};