"use client";

import { useEffect, useRef } from "react";

type NetworkInformation = { saveData?: boolean };

/**
 * Muted, looping, decorative background video. It loads only on screens 768px
 * and wider, for visitors who allow motion and have not enabled data saving,
 * and plays only while on screen. Everyone else sees the poster image
 * rendered behind it.
 */
export function BackgroundVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    let visible = false;
    const sync = () => {
      if (motion.matches || !wide.matches || connection?.saveData) {
        video.pause();
        video.hidden = true;
        return;
      }
      if (!visible) {
        video.pause();
        return;
      }
      if (!video.getAttribute("src")) video.src = src;
      video.hidden = false;
      video.play().catch(() => {});
    };
    // Load and play only while the video is on (or near) the screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px" },
    );
    observer.observe(video.parentElement ?? video);
    motion.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden
      hidden
      className="absolute inset-0 h-full w-full object-cover"
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
