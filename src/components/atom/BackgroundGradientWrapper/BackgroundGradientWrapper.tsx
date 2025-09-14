import React, { useEffect } from "react";
import gradient from "./BackgroundGradientWrapper.module.css";

type Props = {
  children?: any
}

export function BackgroundGradientWrapper({ children }: Props) {
  useEffect(() => {
    const handleLoad = () => {
      const img = new Image();
      img.src = "/images/background.jpg";
      img.onload = () => {
        const aspect = img.width / img.height;
        const containerHeight = window.innerHeight;
        const scaledWidth = aspect * containerHeight;
        document.documentElement.style.setProperty("--bg-w", `${scaledWidth}px`);
      };
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <main className={gradient.backgroundWrapper}>
      <div className={gradient.backgroundImage}></div>
      <div className={gradient.overlay}></div>

      <div className={gradient.children}>{children}</div>
    </main>
  );
}
