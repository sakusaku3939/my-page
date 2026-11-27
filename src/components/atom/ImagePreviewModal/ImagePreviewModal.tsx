import { createPortal } from "react-dom";
import { PreviewImage } from "@/components/atom/PreviewImage/PreviewImage";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

/** Full-screen overlay that shows the original image; clicking anywhere closes it. */
export function ImagePreviewModal({ src, alt, onClose }: Props) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9
      }}
      onClick={onClose}>
      <PreviewImage
        src={src}
        style={{ width: "auto", height: "auto", maxWidth: "90vw", maxHeight: "90vh" }}
        alt={alt}
      />
    </div>,
    document.body
  );
}
