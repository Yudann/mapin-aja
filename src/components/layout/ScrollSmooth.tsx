"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768; //  adjust breakpoint

    if (isMobile) {
      //   console.log('Smooth scroll dimatikan di mobile');
      return;
    }

    const lenis = new Lenis({
      lerp: 0.04,
      smoothWheel: true,
      syncTouch: true,
    });

    window.lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
