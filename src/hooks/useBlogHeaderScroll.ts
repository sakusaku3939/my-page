import { useEffect, useState } from "react";
import commonStyles from "@/styles/blog-common.module.css";
import { useDarkMode } from "./useDarkMode";

/**
 * ブログページでヘッダー分以上スクロールしたかどうかを監視するカスタムフック
 * ダークモードの時は無効になります
 * @returns {boolean} ヘッダーを超えてスクロールしているかどうか
 */
export const useBlogHeaderScroll = (): boolean => {
  const [isScrolledPastHeader, setIsScrolledPastHeader] = useState(false);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    // ダークモードの時は機能を無効にする
    if (isDarkMode) {
      setIsScrolledPastHeader(true);
      return;
    }

    const handleScroll = () => {
      // ヘッダーの高さを取得（ブログヘッダーの高さ）
      const headerElement = document.querySelector(`.${commonStyles.blogHeader}`) as HTMLElement;
      const headerHeight = headerElement ? headerElement.offsetHeight : 0;

      // スクロール位置がヘッダーの高さを超えたかチェック
      setIsScrolledPastHeader(window.scrollY > headerHeight);
    };

    // スクロールイベントリスナーを追加
    window.addEventListener("scroll", handleScroll);

    // 初期状態をチェック
    handleScroll();

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDarkMode]);

  return isScrolledPastHeader;
};