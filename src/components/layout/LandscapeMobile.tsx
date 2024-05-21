import { ReactNode } from 'react';
import { Piece } from '../../schema';
import { InfoGraphic } from '../Infographic';
import { BannerController } from '../banner/BannerController';
import { ResetButton } from '../ResetButton';
import { AIToggle } from '../AIToggle';
import { Birdseye, Title } from '../Title';


const horizontalStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const mainContent: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transform: 'translateY(10px)'
};

const buttonContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: 20,
};

export const LandscapeMobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div style={horizontalStyles} >
        <div style={buttonContainer}>
          <Birdseye />
          <ResetButton />
          <InfoGraphic piece={Piece.Black} />
        </div>
        <div style={mainContent}>
          {children}
          <BannerController top="50%" />
        </div>
        <div style={buttonContainer}>
          <Title />
          <AIToggle />
          <InfoGraphic piece={Piece.Red} />
        </div>
      </div>
    </>
  );
};