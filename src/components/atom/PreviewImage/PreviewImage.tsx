import Image from "next/image";
import { type CSSProperties, useState } from "react";

type PreviewImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

/** Display the original image in a modal without assuming its aspect ratio. */
export function PreviewImage({ src, alt, className, style }: PreviewImageProps) {
  const [size, setSize] = useState<{ src: string; width: number; height: number } | null>(null);
  const dimensions = size?.src === src ? size : { width: 1, height: 1 };

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      unoptimized
      className={className}
      style={style}
      onLoad={({ currentTarget }) => {
        if (currentTarget.naturalWidth && currentTarget.naturalHeight) {
          setSize({ src, width: currentTarget.naturalWidth, height: currentTarget.naturalHeight });
        }
      }}
    />
  );
}
