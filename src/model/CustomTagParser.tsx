import React, { useState } from "react";
import common from "@/styles/common.module.css";
import posts from "@/styles/posts.module.css";
import Image from "next/image";

export function CustomTagParser({ className, children }: React.JSX.IntrinsicElements["h1"]) {
  const [imageLoaded, setImageLoaded] = useState(false);
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
        return <div className={common.imageContainer} style={{ maxWidth: `${width}px` }}>
          <Image src={args[0]} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
        </div>;

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
            <div style={{ width: `${sideWeight}%` }}>
              <div className={common.imageContainer}>
                <Image src={args[1]} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
              </div>
            </div>
            <div style={{ width: 3 }} />
            <div style={{ width: `${100 - sideWeight}%` }}>
              <div className={common.imageContainer}>
                <Image src={args[2]} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
              </div>
            </div>
          </div>
        </>;

      // three-row (side-weight)% (image-path) (image-path) (image-path)
      case "three-row":
        const weight = parseFloat(args[0]);
        return <>
          <div className={posts.row}>
            <span className={`${common.placeholder} ${imageLoaded ? common.loaded : ""}`} />
            <div style={{ display: "flex", flexDirection: "column", width: `${weight}%` }}>
              <div className={common.imageContainer} style={{ height: "50%" }}>
                <Image src={args[1]} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
              </div>
              <div style={{ height: 3 }} />
              <div className={common.imageContainer} style={{ height: "50%" }}>
                <Image src={args[2]} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
              </div>
            </div>
            <div style={{ width: 3 }} />
            <div className={common.imageContainer} style={{ width: `${100 - weight}%` }}>
              <Image src={args[3]} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
            </div>
          </div>
        </>;


      // row (image-path) (image-path) ...
      // 3つ以上の横並びに使う
      case "row":
        return <>
          <div className={posts.row}>
            <span className={`${common.placeholder} ${imageLoaded ? common.loaded : ""}`} />
            {args.map((value: string, key: number) => <>
              <div className={common.imageContainer} key={key}>
                <Image src={value} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
              </div>
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
  const [imageLoaded, setImageLoaded] = useState(false);
  return <>
    <span className={common.imageContainer}>
      <span className={`${common.placeholder} ${imageLoaded ? common.loaded : ""}`} />
      <Image src={src} alt="" sizes="100%" fill onLoad={() => setImageLoaded(true)} />
    </span>
  </>;
}