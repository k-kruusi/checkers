import { useEffect } from "react";
import { useCheckers } from "../../hooks";
import { GamePhase } from "../../schema";
import { ActionType } from "../../reducer";
import { getBannerBgColor } from "../../theme";

const bannerStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "20px 40px",
  color: "white",
  fontSize: "2em",
  textAlign: "center",
  borderRadius: "10px",
  zIndex: 1000,
  animation: "fadeIn 1s ease-in",
  userSelect: "none",
}

export const BannerController = () => {
  const { state, dispatch } = useCheckers();
  const { turn } = state;

  const bgColor = getBannerBgColor(turn.phase);
  const customBannerStyle = {
    ...bannerStyles, backgroundColor: bgColor
  }

  useEffect(() => {
    if ((turn.phase === GamePhase.TransitionToBlack || turn.phase === GamePhase.TransitionToRed)) {
      const timer = setTimeout(() => {
        dispatch({ type: ActionType.BANNER_TRANSITION, currentPhase: turn.phase });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [turn.phase, dispatch]);

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: ActionType.CLEAR_MESSAGE });
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  if (turn.phase === GamePhase.TransitionToBlack) {
    return (<div style={customBannerStyle}>Black Turn</div>);
  }
  else if (turn.phase === GamePhase.TransitionToRed) {
    return (<div style={customBannerStyle}>Red Turn</div>);
  }
  else if (state.message && (turn.phase === GamePhase.Black || turn.phase === GamePhase.Red)) {
    return (<div style={customBannerStyle}>{state.message}</div>)
  }
  return null;
}


