import { ReactNode } from "react";
import { BannerController } from "../banner/BannerController";
import { InfoGraphic } from "./Infographic";
import { ResetButton } from "../ResetButton";
import { AIToggle } from "../AIToggle";
import { PieceCount } from "../../schema";

const verticalStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const mainContent: React.CSSProperties = {
  position: 'relative'
};

const bottomContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  gap: '10px'
};

export const VerticalLayout = ({ children, blackTime, redTime, count, isBlackTurn }: {
  children: ReactNode,
  blackTime: string,
  redTime: string;
  count: PieceCount,
  isBlackTurn: boolean
}) => {

  return (
    <div style={verticalStyles}>
      <div style={mainContent}>
        {children}
        <BannerController />
      </div>
      <div style={bottomContainer}>
        <InfoGraphic name="Black" time={blackTime} count={count.black} myTurn={isBlackTurn} />
        <ResetButton />
        <AIToggle />
        <InfoGraphic name="Red" time={redTime} count={count.red} myTurn={!isBlackTurn} />
      </div>
    </div>
  )
}