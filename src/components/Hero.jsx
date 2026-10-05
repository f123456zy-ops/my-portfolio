import { useCallback, useEffect, useRef, useState } from "react";
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
  const inViewRef = useRef(true);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion] = useState(motionIsReduced);
  const scrollProgress = useScrollProgress(sectionRef);
  const mediaState = resolveHeroMediaState({ loaded, failed, reducedMotion });

  const attemptPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || !mediaState.shouldPlay || !inViewRef.current) {
      return;
    }

    video.muted = true;
    video.setAttribute("muted", "");
    const playback = video.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        // A browser may reject an early autoplay attempt while media is still
        // becoming playable. Keep the poster in place and retry on canplay.
      });
    }
  }, [mediaState.shouldPlay]);

  useEffect(() => {
    if (!loaded || !mediaState.shouldPlay) {
      return;
    }

    attemptPlayback();

    const resumePlayback = () => {
      if (document.visibilityState === "visible") {
        attemptPlayback();
      }
    };

    document.addEventListener("visibilitychange", resumePlayback);
    window.addEventListener("pageshow", resumePlayback);

    return () => {
      document.removeEventListener("visibilitychange", resumePlayback);
      window.removeEventListener("pageshow", resumePlayback);
    };
  }, [attemptPlayback, loaded, mediaState.shouldPlay]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || typeof window.IntersectionObserver !== "function") {
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          attemptPlayback();
        } else {
          video.pause();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [attemptPlayback]);

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
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          data-video-ready={mediaState.videoReady || undefined}
          data-video-failed={failed || undefined}
          onLoadedData={() => setLoaded(true)}
          onCanPlay={attemptPlayback}
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

      <div className="hero__content page-width">
        <p className="hero__kicker">
          <span>NEW MEDIA OPERATIONS / AI CONTENT</span>
          {profile.city}
        </p>
        <h1 id="hero-title"><span>{profile.name}</span></h1>
        <p className="hero__positioning">{profile.title}</p>
        <p className="hero__capabilities">{profile.capabilityLine}</p>
        <p className="hero__statement">{profile.statement}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#work">
            查看代表项目
          </a>
          <a className="button button--ghost" href="/resume-wang-zeyi.pdf" download>
            下载简历
          </a>
        </div>
      </div>

      <p className="hero__rail" aria-hidden="true">STRATEGY&nbsp;&nbsp; AI&nbsp;&nbsp; VIDEO&nbsp;&nbsp; VISUAL</p>
      <div className="hero__footer" aria-hidden="true">
        <span>OPEN TO WORK</span>
        <span>NINGBO / 2026</span>
      </div>
      <a className="hero__scroll" href="#ai" aria-label="向下浏览 AI 内容生产能力">
        <span>SCROLL</span>
      </a>
    </section>
  );
}
