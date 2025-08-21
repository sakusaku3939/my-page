import Image from "next/image";
import { CSSProperties, useState } from "react";
import common from "@/styles/common.module.css";
import blurMap from "@/__generated__/blur-image-map";

type Props = {
  src: string,
  alt?: string,
  sizes?: string,
  key?: string | number,
  containerStyle?: CSSProperties,
};

export function ImageWithPlaceholder({ src, alt = "", sizes = "100%", key, containerStyle }: Props) {
  const blur = (blurMap as Record<string, string | undefined>)[src];

  if (!blur && process.env.NODE_ENV !== "production") {
    console.warn(`[ImageWithPlaceholder] blurMap に "${src}" のブラー画像が見つかりません。プレースホルダーなしで続行します。`);
  }

  const placeholder = blur ? <Image src={blur} alt="" sizes="100%" fill /> : null;

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <span className={common.imageContainer} style={containerStyle} key={key}>
        {!imageLoaded && placeholder}

        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          fill
          onLoad={() => setImageLoaded(true)}
        />
      </span>
    </>
  );
}
