import { useState, useEffect } from 'react';


// better to use a package for this stuff but trying not to.
const isMobileDevice = (): boolean => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

export const isTabletDevice = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();

  return /ipad|tablet|surface|(windows.*touch)|(kindle)|(playbook)|(silk)|(meego)/.test(userAgent);
};

export const useLayout = (breakpoint = 914) => {
  const [isConstrainedWidth, setIsConstrainedWidth] = useState(window.innerWidth < breakpoint);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [isMobile, setIsMobile] = useState<boolean>(isMobileDevice());
  const [isTablet, setIsTablet] = useState<boolean>(isTabletDevice());

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setIsTablet(isTabletDevice());
    const handleResize = () => setIsConstrainedWidth(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);


  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isConstrainedWidth, isLandscape, isMobile, isTablet };
};