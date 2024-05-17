import { useEffect } from "react";
import { useCheckers } from "../hooks";
import { TurnType } from "../schema";
import { ActionType } from "../reducer";
import './BannerControllerStyles.css';


export const BannerController = () => {

  const { state, dispatch } = useCheckers();
  const { turn } = state;

  useEffect(() => {
    if ((turn.type === TurnType.TransitionToBlack || turn.type === TurnType.TransitionToRed)) {
      const timer = setTimeout(() => {
        dispatch({ type: ActionType.BANNER_TRANSITION });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [turn.type, dispatch]);

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: ActionType.CLEAR_MESSAGE });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  if (turn.type === TurnType.TransitionToBlack) {
    return (<div className="banner black-banner">BLACKS TURN</div>);
  }
  else if (turn.type === TurnType.TransitionToRed) {
    return (<div className="banner red-banner">REDS TURN</div>);
  }
  if (state.message) {
    return (<div className={`banner ${turn.type === TurnType.Black ? 'black-banner' : 'red-banner'}`}>{state.message}</div>)
  }

  return null;
}