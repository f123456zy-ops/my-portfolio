import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function calculateScrollProgress(rect, viewportHeight) {
  if (!rect || !Number.isFinite(viewportHeight) || viewportHeight <= 0) {
    return 0;
  }
  const totalDistance = Math.max(1, rect.height + viewportHeight);
  const progress = (viewportHeight - rect.top) / totalDistance;
  return Math.min(1, Math.max(0, progress));
}

export function useScrollProgress(ref) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion || !ref.current) {
      setProgress(0);
      return undefined;
    }

    let animationFrame = 0;
    const update = () => {
      animationFrame = 0;
      setProgress(calculateScrollProgress(ref.current?.getBoundingClientRect(), window.innerHeight));
    };
    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [reducedMotion, ref]);

  return reducedMotion ? 0 : progress;
}
