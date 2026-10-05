import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const INTRO_SESSION_KEY = "wzy-intro-seen";

export function IntroCurtain() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(
    () => typeof window === "undefined" || window.sessionStorage.getItem(INTRO_SESSION_KEY) !== "true",
  );

  useEffect(() => {
    if (visible && !reducedMotion) {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
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
