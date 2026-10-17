import { useSyncExternalStore } from "react";
import commonStyles from "@/styles/blog-common.module.css";
import { createHeaderScrollStore } from "./browserStores";
import { useDarkMode } from "./useDarkMode";

const headerScrollStore = createHeaderScrollStore(`.${commonStyles.blogHeader}`);

/** ダークモード、またはブログヘッダーを超えてスクロールした状態。 */
export const useBlogHeaderScroll = (): boolean => {
  const isDarkMode = useDarkMode();
  const isScrolledPastHeader = useSyncExternalStore(
    headerScrollStore.subscribe,
    headerScrollStore.getSnapshot,
    headerScrollStore.getServerSnapshot
  );

  return isDarkMode || isScrolledPastHeader;
};
