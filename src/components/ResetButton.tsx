import { useCheckers } from "../hooks";
import { ActionType } from "../reducer";

export const ResetButton = () => {
  const { dispatch } = useCheckers();

  const onClick = () => {
    dispatch({ type: ActionType.RESET_GAME });
  }

  return <button onClick={onClick}>Reset</button>;
}