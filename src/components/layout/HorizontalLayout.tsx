import { ReactNode } from 'react';
import { Piece } from '../../schema';
import { InfoGraphic } from '../Infographic';
import { BannerController } from '../banner/BannerController';
import { ResetButton } from '../ResetButton';
import { AIToggle } from '../AIToggle';
import { Title } from '../Title';
import { useLayout } from '../../hooks';
import { theme } from '../../theme';


const horizontalStyles: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const mainContent: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const buttonContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: 10
};

const spacerStyle: React.CSSProperties = {
  height: `calc(${theme.size.tileSize} * 0.5)`
};

export const HorizontalLayout = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useLayout();

  return (
    <>
      <Title />
      <div style={horizontalStyles} >
        <InfoGraphic piece={Piece.Black} />
        <div style={mainContent}>
          {!isMobile && <div style={spacerStyle} />}
          {children}
          <BannerController top="3%" />
          <div style={buttonContainer}>
            <ResetButton />
            <AIToggle />
          </div>
        </div>
        <InfoGraphic piece={Piece.Red} />
      </div>
    </>
  );
};