import { useEffect, useState } from "react";

interface NFCWriterProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onInfo: (message: string) => void;
  url: string;
  text?: string;
}

const NFCWriter: React.FC<NFCWriterProps> = ({
                                               onSuccess,
                                               onError,
                                               onInfo,
                                               url,
                                               text = ""
                                             }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // デバッグ情報を表示
    const userAgent = navigator.userAgent;
    const isHTTPS = window.location.protocol === "https:";
    const hasNDEF = "NDEFReader" in window;

    console.log("NFC Debug Info:", {
      userAgent,
      isHTTPS,
      hasNDEF,
      protocol: window.location.protocol,
      host: window.location.host,
      url
    });

    if (!isHTTPS) {
      console.log("NFC機能はHTTPS環境でのみ動作します");
      return;
    }

    if (!hasNDEF) {
      console.log("このブラウザはNFC機能をサポートしていません（Chrome for Android推奨）");
      return;
    }

    setIsSupported(true);
    setShowButton(true);
  }, [url]);

  const writeToNFC = async () => {
    if (!isSupported || isWriting) return;

    try {
      setIsWriting(true);
      console.log("Starting NFC write...", { url, text });

      // @ts-ignore - NDEFReader is not in TypeScript definitions yet
      const ndef = new NDEFReader();

      const records = [
        {
          recordType: "url",
          data: url
        },
        {
          recordType: "text",
          data: text
        }
      ];

      await ndef.write({
        records
      });

      console.log("NFC write successful");
      onSuccess("NFCタグにリンクを書き込みました！");
      setIsWriting(false);

    } catch (error) {
      console.error("NFC Write Error:", error);
      setIsWriting(false);

      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          onError("NFC権限が拒否されました。ブラウザ設定を確認してください");
        } else if (error.name === "NotSupportedError") {
          onError("このデバイスはNFC機能をサポートしていません");
        } else if (error.name === "NetworkError") {
          onError("NFCタグが見つかりません。タグをデバイスに近づけてください");
        } else {
          onError(`NFC書き込みに失敗しました: ${error.message}`);
        }
      } else {
        onError("NFC書き込みに失敗しました");
      }
    }
  };

  const handleWriteNFC = () => {
    if (isSupported && !isWriting) {
      writeToNFC();
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000
    }}>
      <button
        onClick={handleWriteNFC}
        disabled={isWriting}
        style={{
          backgroundColor: isWriting ? "#666" : "#000",
          color: "white",
          border: "none",
          borderRadius: "25px",
          padding: "12px 24px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: isWriting ? "not-allowed" : "pointer",
          transition: "all 0.3s ease"
        }}
      >
        {isWriting ? "Web NFCで書き込み中..." : "NFCでリンクを送る"}
      </button>
    </div>
  );
};

export default NFCWriter;