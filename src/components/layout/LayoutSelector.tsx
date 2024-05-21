import { ReactNode } from 'react';
import { useLayout } from '../../hooks';
import { VerticalLayout } from './VerticalLayout';
import { HorizontalLayout } from './HorizontalLayout';
import { LandscapeMobileLayout } from './LandscapeMobile';

// handles the timer logic, and board layout wrapping the info pannels and the board.
export const LayoutSelector = ({ children }: { children?: ReactNode }) => {
  const { isConstrainedWidth, isMobile, isLandscape, isTablet } = useLayout();

  if (isMobile && !isTablet) {
    if (isLandscape) {
      return (<LandscapeMobileLayout>{children}</LandscapeMobileLayout>);
    }
    return (<VerticalLayout>{children}</VerticalLayout>);
  }

  if (isTablet) {
    if (isLandscape) {
      return (<HorizontalLayout>{children}</HorizontalLayout>);
    }
    return (<VerticalLayout>{children}</VerticalLayout>);
  }

  return isConstrainedWidth ?
    (<VerticalLayout>{children}</VerticalLayout>) :
    (<HorizontalLayout>{children}</HorizontalLayout>);
}

