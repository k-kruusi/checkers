import { useState } from "react";
import { useCheckers } from "../hooks";
import { ActionType } from "../reducer";
import { theme } from "../theme";

const sharedButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: theme.colors.ivory,
  color: theme.colors.grey,
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(218, 165, 32, 0.2)',
  transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s'
}

const hoverStyles = {
  backgroundColor: theme.colors.gold,
  color: theme.colors.ivory,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'
}

const clickedStyles = {
  backgroundColor: theme.colors.ivory,
  color: theme.colors.gold,
}

// would rather do these sort of styles in css with :hover, :focus
// but im not using any packages and it makes it difficult 
// while still wanting to inject my themes.
// styled components or tailwind would make this easier.
export const ResetButton = () => {
  const { dispatch } = useCheckers();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);

  const onClick = () => {
    dispatch({ type: ActionType.RESET_GAME });
  }

  const buttonStyle: React.CSSProperties = isDown ?
    { ...sharedButtonStyle, ...clickedStyles } :
    isHovered ?
      { ...sharedButtonStyle, ...hoverStyles } :
      sharedButtonStyle;

  return (<button
    style={buttonStyle}
    aria-label="reset"
    onMouseOver={() => setIsHovered(true)}
    onMouseOut={() => setIsHovered(false)}
    onMouseDown={() => setIsDown(true)}
    onMouseUp={() => setIsDown(false)}
    onClick={onClick}>RESET</button>);
}