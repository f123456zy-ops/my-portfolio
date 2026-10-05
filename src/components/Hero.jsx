import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import { useScrollProgress } from "../hooks/useScrollProgress";

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
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion] = useState(motionIsReduced);
  const scrollProgress = useScrollProgress(sectionRef);
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
    <section
      ref={sectionRef}
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      style={{
        "--hero-scale": (1.015 + scrollProgress * 0.035).toFixed(4),
        "--hero-shift": `${Math.round(scrollProgress * 30)}px`,
      }}
    >
      <img
        className="hero__poster"
        src="/assets/hero-cinematic-poster.jpg"
        alt=""
        aria-hidden="true"
        data-visible={mediaState.showPoster || undefined}
      />
      {!reducedMotion && (
        <video
          ref={videoRef}
          className="hero__video"
          data-parallax
          poster="/assets/hero-cinematic-poster.jpg"
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
          <source
            src="/videos/hero-cinematic-mobile.mp4"
            media="(max-width: 767px)"
            type="video/mp4"
          />
          <source src="/videos/hero-cinematic-desktop.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__chapter" aria-hidden="true">
        <span>CHAPTER 01 / 04</span>
        <span>VISUAL STORY / 2026</span>
      </div>

      <div className="hero__content page-width">
        <p className="hero__kicker">
          <span>A VISUAL REALITY</span>
          {profile.roles.join(" · ")} · {profile.city}
        </p>
        <h1 id="hero-title"><span>{profile.name}</span></h1>
        <p className="hero__positioning">{profile.positioning}</p>
        <p className="hero__statement">{profile.statement}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            查看作品
            <ArrowRight aria-hidden="true" weight="bold" />
          </a>
          <a className="button button--ghost" href="/resume-wang-zeyi.pdf" download>
            下载简历
            <DownloadSimple aria-hidden="true" weight="bold" />
          </a>
        </div>
      </div>

      <p className="hero__rail" aria-hidden="true">PHOTO&nbsp;&nbsp; VIDEO&nbsp;&nbsp; DESIGN&nbsp;&nbsp; AI</p>
      <div className="hero__footer" aria-hidden="true">
        <span>01 / 04</span>
        <span>IDEAS INTO VISUAL WORLDS</span>
        <span>WANG ZEYI / PORTFOLIO</span>
      </div>
      <a className="hero__scroll" href="#ai-practice" aria-label="向下浏览 AI 实践">
        <span>SCROLL</span>
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
