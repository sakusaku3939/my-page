import { useEffect, useState } from "react";
import commonStyles from "@/styles/blog-common.module.css";

/**
 * ブログページでヘッダー分以上スクロールしたかどうかを監視するカスタムフック
 * @returns {boolean} ヘッダーを超えてスクロールしているかどうか
 */
export const useBlogHeaderScroll = (): boolean => {
  const [isScrolledPastHeader, setIsScrolledPastHeader] = useState(false);

  useEffect(() => {
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
  }, []);

  return isScrolledPastHeader;
};