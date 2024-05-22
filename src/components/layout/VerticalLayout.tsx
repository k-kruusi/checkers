import { ReactNode } from 'react';
import { BannerController } from '../banner/BannerController';
import { InfoGraphic } from '../Infographic';
import { ResetButton } from '../ResetButton';
import { AIToggle } from '../AIToggle';
import { Piece } from '../../schema';
import { Title } from '../Title';

const verticalStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: '100vh',
};

const mainContent: React.CSSProperties = {
  position: 'relative'
};

const container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  gap: '10px',
  marginTop: '10px'
};

const buttonsContainer: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

export const VerticalLayout = ({ children }: {
  children: ReactNode,
}) => {

  return (
    <div style={verticalStyles}>
      <Title />
      <div style={container}>
        <InfoGraphic piece={Piece.Black} />
        <div style={buttonsContainer}>
          <ResetButton />
          <BannerController top="50%" />
          <AIToggle />
        </div>
        <InfoGraphic piece={Piece.Red} />
      </div>
      <div style={mainContent}>
        {children}
      </div>
    </div>
  );
};