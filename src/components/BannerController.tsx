import { useEffect } from "react";
import { useCheckers } from "../hooks";
import { GamePhase } from "../schema";
import { ActionType } from "../reducer";
import './BannerControllerStyles.css';


export const BannerController = () => {
  const { state, dispatch } = useCheckers();
  const { turn } = state;

  useEffect(() => {
    if ((turn.phase === GamePhase.TransitionToBlack || turn.phase === GamePhase.TransitionToRed)) {
      const timer = setTimeout(() => {
        dispatch({ type: ActionType.BANNER_TRANSITION, currentPhase: turn.phase });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [turn.phase, dispatch]);

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: ActionType.CLEAR_MESSAGE });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  if (turn.phase === GamePhase.TransitionToBlack) {
    return (<div className="banner black-banner">Black Turn</div>);
  }
  else if (turn.phase === GamePhase.TransitionToRed) {
    return (<div className="banner red-banner">Red Turn</div>);
  }
  else if (state.message && (turn.phase === GamePhase.Black || turn.phase === GamePhase.Red)) {
    return (<div className={`banner ${turn.phase === GamePhase.Black ? 'black-banner' : 'red-banner'}`}>{state.message}</div>)
  }
  return null;
}

