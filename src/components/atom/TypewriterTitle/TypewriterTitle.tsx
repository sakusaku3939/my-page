"use client";

import React, { useState, useEffect } from "react";
import typewriter from "./TypewriterTitle.module.css";

const TypewriterTitle = ({ text = "Aokiti", speed = 150 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      // 入力完了後にカーソルを消す
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isComplete]);

  return (
    <div className={typewriter.title}>
      {displayText}
      {!isComplete && <span className={typewriter.cursor}>|</span>}
    </div>
  );
};

export default TypewriterTitle;