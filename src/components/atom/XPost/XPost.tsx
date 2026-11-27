import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";
import style from "./XPost.module.css";

type Align = "center" | "left";

type Twttr = {
  widgets: {
    createTweet: (
      id: string,
      target: HTMLElement,
      options: { theme: "light" | "dark"; dnt: boolean; align: Align }
    ) => Promise<HTMLElement | undefined>;
  };
};

declare global {
  interface Window {
    twttr?: Twttr;
  }
}

let widgetsPromise: Promise<Twttr> | null = null;

function loadWidgets(): Promise<Twttr> {
  if (window.twttr?.widgets) return Promise.resolve(window.twttr);
  widgetsPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => window.twttr?.widgets ? resolve(window.twttr) : reject(new Error("X widgets are unavailable"));
    script.onerror = () => {
      widgetsPromise = null;
      reject(new Error("Failed to load X widgets"));
    };
    document.body.appendChild(script);
  });
  return widgetsPromise;
}

type Status = "loading" | "loaded" | "failed";

export function XPost({ id, placeholderHeight, align = "center" }: { id: string; placeholderHeight: number; align?: Align }) {
  const embedRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useDarkMode();
  const [status, setStatus] = useState<Status>("loading");
  const url = `https://x.com/i/status/${id}`;

  useEffect(() => {
    const target = embedRef.current;
    if (!target) return;
    let cancelled = false;
    setStatus("loading");

    loadWidgets()
      .then(twttr => {
        if (cancelled) return;
        target.replaceChildren();
        return twttr.widgets.createTweet(id, target, { theme: isDarkMode ? "dark" : "light", dnt: true, align });
      })
      .then(element => {
        if (!cancelled) setStatus(element ? "loaded" : "failed");
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
      target.replaceChildren();
    };
  }, [id, isDarkMode, align]);

  return (
    <div className={style.wrapper} style={status === "loading" ? { minHeight: placeholderHeight } : undefined}>
      {status === "loading" && <div className={`${style.placeholder} ${align === "left" ? style.left : ""}`} style={{ height: placeholderHeight }} />}
      <div ref={embedRef} />
      {status === "failed" && <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>}
    </div>
  );
}
