import React from "react";
import common from "@/styles/common.module.css";
import posts from "@/styles/posts.module.css";
import Image from "next/image";
import { ImageWithPlaceholder } from "@/components/atom/ImageWithPlaceholder/ImageWithPlaceholder";

export function CustomTagParser({ className, children }: React.JSX.IntrinsicElements["h1"]) {
  if (children) {
    const params = children.toString().split(" ");
    const name = params[0];
    const args = params.filter((_: string, index: number) => index !== 0);
    let matched;

    switch (name) {
      // br-8px, br-16px
      case (matched = name.match(/^br-(\d+)px$/)) && name:
        const height = parseInt(matched![1], 10);
        return <div style={{ height: height }}></div>;

      // img-400px (image-path)
      case (matched = name.match(/^img-(\d+)px$/)) && name:
        const width = parseInt(matched![1], 10);
        return <ImageWithPlaceholder src={args[0]} containerStyle={{ maxWidth: `${width}px` }} />;

      // speaker-deck (data-id)
      case "speaker-deck":
        return <>
          <div className={posts.speakerDeck}>
            <iframe
              src={`https://speakerdeck.com/player/${args[0]}`}
              data-darkreader-inline-border-top="" data-darkreader-inline-border-right=""
              data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""
              data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""
              data-darkreader-inline-boxshadow="" data-ratio="1.78343949044586" />
          </div>
        </>;

      // two-row (side-weight)% (image-path) (image-path)
      case "two-row":
        const sideWeight = parseFloat(args[0]);
        return <>
          <div className={posts.row}>
            <ImageWithPlaceholder src={args[1]} containerStyle={{ width: `${sideWeight}%` }} />
            <div style={{ width: 3 }} />
            <ImageWithPlaceholder src={args[2]} containerStyle={{ width: `${100 - sideWeight}%` }} />
          </div>
        </>;

      // three-row (side-weight)% (image-path) (image-path) (image-path)
      case "three-row":
        const weight = parseFloat(args[0]);
        return <>
          <div className={posts.row}>
            <div style={{ display: "flex", flexDirection: "column", width: `${weight}%` }}>
              <ImageWithPlaceholder src={args[1]} containerStyle={{ height: "50%" }} />
              <div style={{ height: 3 }} />
              <ImageWithPlaceholder src={args[2]} containerStyle={{ height: "50%" }} />
            </div>
            <div style={{ width: 3 }} />
            <ImageWithPlaceholder src={args[3]} containerStyle={{ width: `${100 - weight}%` }} />
          </div>
        </>;

      // row (image-path) (image-path) ...
      // 3つ以上の横並びに使う
      case "row":
        return <>
          <div className={posts.row}>
            {args.map((value: string, key: number) => <>
              <ImageWithPlaceholder src={value} key={key} containerStyle={{ width: "100%" }} />
              <div style={{ width: 3 }} />
            </>)}
          </div>
        </>;

      // row-link (image-path):(url) (image-path):(url) ...
      case "row-link":
        return <>
          <div className={posts.row}>
            {args.map((value: string, key: number) => {
              const rowParams = value.split(":");
              return (
                <div className={`${common.imageContainer} ${posts.rowLink}`} key={key}>
                  <a href={"https://" + rowParams[1]} target="_blank">
                    <Image src={rowParams[0]} alt="" sizes="100%" fill />
                  </a>
                </div>
              );
            })}
          </div>
        </>;

      // youtube (youtube-id)
      case "youtube":
        return <>
          <div className={posts.youtube}>
            <iframe src={`https://www.youtube.com/embed/${params[1]}`} allowFullScreen></iframe>
          </div>
        </>;

      default:
        return <h1 className={className}>{children}</h1>;
    }
  }

  return <h1 className={className}>{children}</h1>;
}

export function ImageTagParser(image: any) {
  const regExp = /^\/public\//;
  let src = image.src;
  if (src.match(regExp)) {
    src = "/" + src.split(regExp)[1];
  }

  return <>
    <ImageWithPlaceholder src={src} />
  </>;
}