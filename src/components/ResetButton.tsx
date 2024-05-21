import { useCheckers } from '../hooks';
import { ActionType } from '../reducer';
import '../theme/ButtonStyle.css';
import { getString } from '../utils';

// resets the game
export const ResetButton = () => {
  const { dispatch } = useCheckers();

  const onClick = () => {
    dispatch({ type: ActionType.RESET_GAME });
  }

  return (
    <button
      className="shared-button"
      aria-label="reset"
      onClick={onClick}>
      {getString('reset')}
    </button>
  );
}