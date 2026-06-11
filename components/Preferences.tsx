"use client";

/*
 * Theme + motion preference controls and the shared hook motion components
 * use to disable themselves. Choices persist in localStorage and apply as
 * classes on <html> (bootstrapped pre-paint in app/layout.tsx).
 */

import { useCallback, useEffect, useState } from "react";

const MOTION_EVENT = "hk-motionpref";
const THEME_EVENT = "hk-themepref";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    document.documentElement.classList.contains("reduce-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True when the user asked for less motion (OS setting or site toggle). */
export function useMotionPref(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const update = () => setReduced(prefersReducedMotion());
    update();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    window.addEventListener(MOTION_EVENT, update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener(MOTION_EVENT, update);
    };
  }, []);
  return reduced;
}

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark === true}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="label flex items-center gap-1.5 hover:text-ink transition-colors duration-300 cursor-pointer"
    >
      <span aria-hidden>{dark ? "☀" : "☾"}</span>
      <span>{dark === null ? "Theme" : dark ? "Light" : "Dark"}</span>
    </button>
  );
}

export function MotionToggle() {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    setReduced(document.documentElement.classList.contains("reduce-motion"));
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("reduce-motion");
    document.documentElement.classList.toggle("reduce-motion", next);
    try {
      localStorage.setItem("motion", next ? "reduced" : "full");
    } catch {}
    setReduced(next);
    window.dispatchEvent(new Event(MOTION_EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced === true}
      title={reduced ? "Enable animations" : "Reduce animations"}
      className="label flex items-center gap-1.5 hover:text-ink transition-colors duration-300 cursor-pointer"
    >
      <span aria-hidden>{reduced ? "▶" : "⏸"}</span>
      <span>{reduced === null ? "Motion" : reduced ? "Motion on" : "Motion off"}</span>
    </button>
  );
}
