"use client";

import { useState, useEffect } from "react";

/**
 * Detects mobile devices via viewport width AND touch capability.
 * Used to disable heavy animations on mobile for performance.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < breakpoint ||
          ("ontouchstart" in window && window.innerWidth < 1024)
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
