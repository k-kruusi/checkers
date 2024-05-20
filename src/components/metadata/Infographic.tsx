
import { theme } from "../../theme";
import { ReactComponent as TimeIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as PiecesIcon } from '../../assets/icons/pieces.svg';

const outterContainer: React.CSSProperties = {
  border: `4px solid ${theme.colors.gold}`,
  borderRadius: 5,
  width: 'fit-content',
  userSelect: 'none',
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

export const InfoGraphic = ({ name, time, count, myTurn }: { name: string, time: string, count: number, myTurn: boolean }) => {

  const innerContainer: React.CSSProperties = {
    margin: 5,
    padding: "5px 10px",
    backgroundColor: myTurn ? theme.colors.ivory : theme.colors.grey,
    fontWeight: 'bold',
    textAlign: 'left'
  }

  return (<div style={outterContainer}>
    <div style={innerContainer}>
      <div><h1 style={headerStyle}>{name}</h1></div>
      <div style={rowStyle}><TimeIcon /> <p>{time}</p></div>
      <div style={rowStyle}><PiecesIcon /> <p>{count}</p></div>
    </div>
  </div>);
}