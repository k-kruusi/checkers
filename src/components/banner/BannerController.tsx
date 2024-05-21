import { useCallback, useEffect, useMemo } from "react";
import { useCheckers } from "../../hooks";
import { GamePhase } from "../../schema";
import { ActionType } from "../../reducer";
import { getBannerBgColor, theme } from "../../theme";

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
  fontFamily: theme.fonts.amatic,
  fontWeight: 700,
};

export const BannerController = () => {
  const { state, dispatch } = useCheckers();
  const { turn, message } = state;

  const customBannerStyle = useMemo(() => {
    const bgColor = getBannerBgColor(turn.phase);
    return {
      ...bannerStyles, backgroundColor: bgColor
    }
  }, [turn.phase]);

  const clearMessage = useCallback(() => {
    dispatch({ type: ActionType.CLEAR_MESSAGE });
  }, [dispatch]);

  // these two use effects could be combined into one, but it makes
  // cleanup for the timers a bit awkward.
  useEffect(() => {
    if ((turn.phase === GamePhase.TransitionToBlack || turn.phase === GamePhase.TransitionToRed)) {
      const transitionBanner = () => {
        dispatch({ type: ActionType.BANNER_TRANSITION, currentPhase: turn.phase });
      }
      const timer = setTimeout(transitionBanner, 1200);
      return () => clearTimeout(timer);
    }
  }, [turn.phase, dispatch]);

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(clearMessage, 1200);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch, clearMessage]);

  const bannerContent = getBannerContent(turn.phase, message);
  if (!bannerContent) {
    return null;
  }

  return (<div style={customBannerStyle}>{bannerContent}</div>);
};


const getBannerContent = (phase: GamePhase, message: string | null) => {
  if (phase === GamePhase.TransitionToBlack) {
    return "Black Turn";
  }
  if (phase === GamePhase.TransitionToRed) {
    return "Red Turn";
  }
  if (message && (phase === GamePhase.Black || phase === GamePhase.Red)) {
    return message;
  }
  return null;
};