import { useEffect, useRef, useState } from "react";

/**
 * useScrollDirection
 * Detecta dirección de scroll ("down" | "up") con umbral y rAF.
 * Devuelve además pulsos cortos: isScrollingDown / isScrollingUp (true por ~120ms).
 *
 * @param {number} threshold  píxeles mínimos para considerar desplazamiento (default: 8)
 * @param {number} activateAt scrollY mínimo desde el que se activa la detección (default: 0)
 * @returns {{ direction: "down"|"up", isScrollingDown: boolean, isScrollingUp: boolean, y: number }}
 */
export default function useScrollDirection(threshold = 8, activateAt = 0) {
  const [direction, setDirection] = useState("up");
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [y, setY] = useState(0);

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const pulseRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resetPulse = () => {
      if (pulseRef.current) clearTimeout(pulseRef.current);
      pulseRef.current = setTimeout(() => {
        setIsScrollingDown(false);
        setIsScrollingUp(false);
      }, 120);
    };

    const onScroll = () => {
      const currY = window.scrollY;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const lastY = lastYRef.current;
          const delta = currY - lastY;

          if (Math.abs(delta) >= threshold && currY >= activateAt) {
            const dir = delta > 0 ? "down" : "up";
            setDirection(dir);
            setY(currY);
            setIsScrollingDown(dir === "down");
            setIsScrollingUp(dir === "up");
            resetPulse();
            lastYRef.current = currY;
          } else if (currY < activateAt && direction !== "up") {
            // cerca del top forzamos "up"
            setDirection("up");
            setY(currY);
            setIsScrollingDown(false);
            setIsScrollingUp(true);
            resetPulse();
            lastYRef.current = currY;
          }

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    lastYRef.current = window.scrollY;
    setY(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (pulseRef.current) clearTimeout(pulseRef.current);
    };
  }, [threshold, activateAt, direction]);

  return { direction, isScrollingDown, isScrollingUp, y };
}
