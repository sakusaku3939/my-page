import { useState } from "react";
import { ImagePreviewModal } from "@/components/atom/ImagePreviewModal/ImagePreviewModal";

type Props = {
  src?: string;
  alt?: string;
};

/** Plain <img> that opens the original image in a modal when clicked. */
export function ZoomableImage({ src, alt = "" }: Props) {
  const [open, setOpen] = useState(false);
  if (!src) return null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ cursor: "zoom-in" }} onClick={() => setOpen(true)} />
      {open && <ImagePreviewModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
