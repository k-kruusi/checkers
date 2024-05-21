import { useCheckers } from '../hooks';
import { ActionType } from '../reducer';
import { PlayerType } from '../schema';
import '../theme/ButtonStyle.css';
import { getString } from '../utils';

// simple button toggles ai on and off
export const AIToggle = () => {
  const { state, dispatch } = useCheckers();
  const isOn = state.players.some((p) => p.type === PlayerType.Computer);
  const text = isOn ? getString("on") : getString('off');

  const onClick = () => {
    dispatch({ type: ActionType.TOGGLE_AI });
  };

  return <button className="shared-button" aria-label="ai-toggle" onClick={onClick}>{getString("ai")} {text}</button>;
}