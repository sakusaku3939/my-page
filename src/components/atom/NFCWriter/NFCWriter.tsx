import { useRef, useState, useSyncExternalStore } from "react";
import { nfcSupportStore } from "@/hooks/browserStores";

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
  url,
  text = ""
}) => {
  const isSupported = useSyncExternalStore(
    nfcSupportStore.subscribe,
    nfcSupportStore.getSnapshot,
    nfcSupportStore.getServerSnapshot
  );
  const [isWriting, setIsWriting] = useState(false);
  const writeInProgress = useRef(false);

  const writeToNFC = async () => {
    if (!isSupported || writeInProgress.current) return;
    writeInProgress.current = true;

    try {
      setIsWriting(true);
      console.log("Starting NFC write...", { url, text });

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
    } catch (error) {
      console.error("NFC Write Error:", error);

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
    } finally {
      writeInProgress.current = false;
      setIsWriting(false);
    }
  };

  const handleWriteNFC = () => {
    if (isSupported && !isWriting) {
      void writeToNFC();
    }
  };

  if (!isSupported) {
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