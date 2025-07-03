"use client";

import React, { useState, useEffect } from "react";
import typewriter from "./TypewriterTitle.module.css";
import { useRouter } from "next/router";

const TypewriterTitle = ({ text = "Aokiti", speed = 150 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsPageLoaded(false);
      setDisplayText("");
      setCurrentIndex(0);
      setIsComplete(false);
      setTimeout(() => setIsPageLoaded(true), 100);
    };

    if (router.isReady) setTimeout(() => setIsPageLoaded(true), 100);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => router.events.off("routeChangeComplete", handleRouteChangeComplete);
  }, [router]);

  useEffect(() => {
    if (!isPageLoaded) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isComplete, isPageLoaded]);

  return (
    <div className={typewriter.title}>
      {displayText}
      {!isComplete && <span className={typewriter.cursor}>|</span>}
    </div>
  );
};

export default TypewriterTitle;