import { useState, useEffect, useCallback } from "react";

export function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return isMobile;
}
