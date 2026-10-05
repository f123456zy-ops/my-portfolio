import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";

export function resolveHeroMediaState({ loaded, failed, reducedMotion }) {
  if (failed || reducedMotion) {
    return { videoReady: false, showPoster: true, shouldPlay: false };
  }

  return {
    videoReady: Boolean(loaded),
    showPoster: !loaded,
    shouldPlay: true,
  };
}

function motionIsReduced() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero({ profile }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion] = useState(motionIsReduced);
  const mediaState = resolveHeroMediaState({ loaded, failed, reducedMotion });

  useEffect(() => {
    if (!loaded || !mediaState.shouldPlay || !videoRef.current) {
      return;
    }

    const playback = videoRef.current.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => setFailed(true));
    }
  }, [loaded, mediaState.shouldPlay]);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <img
        className="hero__poster"
        src="/assets/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        data-visible={mediaState.showPoster || undefined}
      />
      {!reducedMotion && (
        <video
          ref={videoRef}
          className="hero__video"
          poster="/assets/hero-poster.jpg"
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          data-video-ready={mediaState.videoReady || undefined}
          onLoadedData={() => setLoaded(true)}
          onError={() => setFailed(true)}
        >
          <source src="/videos/hero-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content page-width">
        <p className="hero__kicker">{profile.roles.join(" · ")} · {profile.city}</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero__positioning">{profile.positioning}</p>
        <p className="hero__statement">{profile.statement}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            查看作品
            <ArrowRight aria-hidden="true" weight="bold" />
          </a>
          <a className="button button--ghost" href="#contact">联系我</a>
        </div>
      </div>

      <p className="hero__rail" aria-hidden="true">PHOTO&nbsp;&nbsp; VIDEO&nbsp;&nbsp; DESIGN&nbsp;&nbsp; AI</p>
      <a className="hero__scroll" href="#ai-practice" aria-label="向下浏览 AI 实践">
        <span>SCROLL</span>
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
