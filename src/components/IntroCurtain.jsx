import { useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function IntroCurtain() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

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
        <span>VISUAL STORY / 2026</span>
      </div>
      <span className="intro-curtain__panel" />
      <span className="intro-curtain__panel" />
      <span className="intro-curtain__panel" />
    </div>
  );
}
