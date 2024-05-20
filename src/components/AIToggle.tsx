import { useCallback } from "react";
import { useCheckers } from "../hooks";
import { ActionType } from "../reducer";
import { GamePhase, PlayerType } from "../schema";
import "../theme/ButtonStyle.css";
import { reducePhase } from "../utils";


export const AIToggle = () => {

  const { state, dispatch } = useCheckers();

  const isOn = state.players.some((p) => p.type === PlayerType.Computer);

  const text = isOn ? 'On' : 'Off'

  const onClick = useCallback(() => {
    dispatch({ type: ActionType.TOGGLE_AI });
  }, [dispatch]);

  return <button className="shared-button" aria-label="ai-toggle" onClick={onClick}>AI {text}</button>;
}