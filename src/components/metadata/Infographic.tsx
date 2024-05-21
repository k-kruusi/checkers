
import { theme } from "../../theme";
import { ReactComponent as TimeIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as PiecesIcon } from '../../assets/icons/pieces.svg';
import { useMemo } from "react";

const outterContainer: React.CSSProperties = {
  border: `4px solid ${theme.colors.gold}`,
  borderRadius: 5,
  width: 'fit-content',
  minWidth: 85,
  userSelect: 'none',
  fontFamily: theme.fonts.amatic,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
  textAlign: 'left',
  fontSize: 18,
};

const headerStyle: React.CSSProperties = {
  fontSize: 18,
  textAlign: 'center'
};

export const InfoGraphic = ({ name, time, count, myTurn }: {
  name: string,
  time: string,
  count: number,
  myTurn: boolean
}) => {

  const innerContainer: React.CSSProperties = useMemo(() => {
    return {
      margin: 5,
      padding: "5px 10px",
      backgroundColor: myTurn ? theme.colors.ivory : theme.colors.grey,
      fontWeight: 'bold',
      textAlign: 'left',
    };
  }, [myTurn]);

  return (<div style={outterContainer}>
    <div style={innerContainer}>
      <div><h1 style={headerStyle}>{name}</h1></div>
      <div style={rowStyle}><TimeIcon /> <p>{time}</p></div>
      <div style={rowStyle}><PiecesIcon /> <p>{count}</p></div>
    </div>
  </div>);
};