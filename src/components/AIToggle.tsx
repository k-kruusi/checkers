import { useCheckers } from "../hooks";
import { ActionType } from "../reducer";
import { PlayerType } from "../schema";
import "../theme/ButtonStyle.css";

// simple button toggles ai on and off
export const AIToggle = () => {
  const { state, dispatch } = useCheckers();
  const isOn = state.players.some((p) => p.type === PlayerType.Computer);
  const text = isOn ? 'On' : 'Off'

  const onClick = () => {
    dispatch({ type: ActionType.TOGGLE_AI });
  };

  return <button className="shared-button" aria-label="ai-toggle" onClick={onClick}>AI {text}</button>;
}