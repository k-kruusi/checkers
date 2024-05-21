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
  justifyContent: 'center',
};

const mainContent: React.CSSProperties = {
  position: 'relative'
};

const bottomContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  gap: '10px'
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
      <div style={mainContent}>
        {children}
      </div>
      <div style={bottomContainer}>
        <InfoGraphic piece={Piece.Black} />
        <div style={buttonsContainer}>
          <ResetButton />
          <BannerController top="50%" />
          <AIToggle />
        </div>
        <InfoGraphic piece={Piece.Red} />
      </div>
    </div>
  );
};