import { ReactNode } from 'react';
import { PieceCount } from '../../schema';
import { InfoGraphic } from './Infographic';
import { BannerController } from '../banner/BannerController';
import { ResetButton } from '../ResetButton';
import { AIToggle } from '../AIToggle';
import { Title } from '../Title';
import { getString } from '../../utils';

const horizontalStyles: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1vw',
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

export const HorizontalLayout = ({ children, blackTime, redTime, count, isBlackTurn }: {
  children: ReactNode,
  blackTime: string,
  redTime: string;
  count: PieceCount,
  isBlackTurn: boolean
}) => {

  return (
    <>
      <Title />
      <div style={horizontalStyles} >
        <InfoGraphic name={getString("black")} time={blackTime} count={count.black} myTurn={isBlackTurn} />
        <div style={mainContent}>
          {children}
          <BannerController />
          <div style={buttonContainer}>
            <ResetButton />
            <AIToggle />
          </div>
        </div>
        <InfoGraphic name={getString("red")} time={redTime} count={count.red} myTurn={!isBlackTurn} />
      </div>
    </>
  );
};