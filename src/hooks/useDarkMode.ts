import { useSyncExternalStore } from "react";
import { darkModeStore } from "./browserStores";

/** システムのカラーテーマを監視する（SSR 時はライトモード）。 */
export const useDarkMode = (): boolean => useSyncExternalStore(
  darkModeStore.subscribe,
  darkModeStore.getSnapshot,
  darkModeStore.getServerSnapshot
);
