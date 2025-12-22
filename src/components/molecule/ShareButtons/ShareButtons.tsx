import React from "react";
import { siFacebook, siHatenabookmark, siX } from "simple-icons";
import styles from "./ShareButtons.module.css";

type ShareButtonsProps = {
  url: string;
  title: string;
  description?: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description = "" }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    x: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    hatena: `https://b.hatena.ne.jp/entry/s/${url.replace(/^https?:\/\//, "")}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URLをコピーしました");
    } catch (err) {
      console.error("URLのコピーに失敗しました:", err);
    }
  };

  return (
    <div className={styles.shareButtons}>
      <h3 className={styles.shareTitle}>記事をシェア</h3>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.shareButton} ${styles.x}`}
          onClick={() => handleShare("x")}
          aria-label="Xでシェア"
        >
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <path d={siX.path} />
          </svg>
          X
        </button>

        <button
          className={`${styles.shareButton} ${styles.facebook}`}
          onClick={() => handleShare("facebook")}
          aria-label="Facebookでシェア"
        >
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <path d={siFacebook.path} />
          </svg>
          Facebook
        </button>

        <button
          className={`${styles.shareButton} ${styles.hatena}`}
          onClick={() => handleShare("hatena")}
          aria-label="はてなブックマークでシェア"
        >
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <path d={siHatenabookmark.path} />
          </svg>
          はてブ
        </button>

        <button
          className={`${styles.shareButton} ${styles.copy}`}
          onClick={handleCopyUrl}
          aria-label="URLをコピー"
        >
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <path
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
          URLコピー
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;