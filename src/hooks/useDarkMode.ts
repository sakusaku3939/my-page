import { useEffect, useState } from "react";

/**
 * ダークモードの状態を監視するカスタムフック
 * @returns {boolean} ダークモードかどうか
 */
export const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // メディアクエリを作成
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // 初期状態を設定
    setIsDarkMode(mediaQuery.matches);

    // メディアクエリの変更を監視
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // クリーンアップ
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDarkMode;
};