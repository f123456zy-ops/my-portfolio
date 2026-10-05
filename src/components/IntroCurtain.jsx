import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const INTRO_SESSION_KEY = "wzy-intro-seen";

function hasSeenIntro() {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberIntro() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  } catch {
    // Storage can be disabled by privacy settings; the intro still works for this render.
  }
}

export function IntroCurtain() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasSeenIntro());

  useEffect(() => {
    if (visible && !reducedMotion) {
      rememberIntro();
    }
  }, [reducedMotion, visible]);

  if (reducedMotion || !visible) {
    return null;
  }

  return (
    <div
      className="intro-curtain"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget.lastElementChild) {
          setVisible(false);
        }
      }}
    >
      <div className="intro-curtain__credit">
        <strong>WZY</strong>
        <span>NEW MEDIA OPERATIONS / AI CONTENT</span>
      </div>
      <span className="intro-curtain__panel" />
      <span className="intro-curtain__panel" />
      <span className="intro-curtain__panel" />
    </div>
  );
}
