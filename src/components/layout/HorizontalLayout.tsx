import { ReactNode } from 'react';
import { Piece } from '../../schema';
import { InfoGraphic } from '../Infographic';
import { BannerController } from '../banner/BannerController';
import { ResetButton } from '../ResetButton';
import { AIToggle } from '../AIToggle';
import { Title } from '../Title';


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

export const HorizontalLayout = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <Title />
      <div style={horizontalStyles} >
        <InfoGraphic piece={Piece.Black} />
        <div style={mainContent}>
          {children}
          <BannerController top="2%" />
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