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
      <span />
      <span />
      <span />
    </div>
  );
}
