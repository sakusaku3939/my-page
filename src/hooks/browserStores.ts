// Browser values have deterministic server snapshots so SSR and hydration agree.
const getServerSnapshot = () => false;
const noop = () => {};
const darkModeQuery = "(prefers-color-scheme: dark)";

export const darkModeStore = {
  getServerSnapshot,
  getSnapshot: () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(darkModeQuery).matches,
  subscribe: (onChange: () => void) => {
    if (typeof window.matchMedia !== "function") return noop;
    const mediaQuery = window.matchMedia(darkModeQuery);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }
};

export const createHeaderScrollStore = (headerSelector: string) => ({
  getServerSnapshot,
  getSnapshot: () => {
    if (typeof window === "undefined") return false;
    const header = document.querySelector<HTMLElement>(headerSelector);
    return window.scrollY > (header?.offsetHeight ?? 0);
  },
  subscribe: (onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    window.addEventListener("pageshow", onChange);

    // Font loading or responsive content can change the threshold without a scroll.
    const header = document.querySelector(headerSelector);
    const observer = typeof ResizeObserver === "undefined"
      ? undefined
      : new ResizeObserver(onChange);
    if (header) observer?.observe(header);

    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("pageshow", onChange);
      observer?.disconnect();
    };
  }
});

export const nfcSupportStore = {
  getServerSnapshot,
  getSnapshot: () =>
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    typeof window.NDEFReader === "function",
  // Web NFC availability is fixed for this document; checking never requests access.
  subscribe: () => noop
};
