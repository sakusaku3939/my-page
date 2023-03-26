import { HeadingProps } from "react-markdown/lib/ast-to-react";
import common from "@/styles/common.module.css";
import posts from "@/styles/posts.module.css";
import Image from "next/image";

export function CustomTagParser({ className, children }: HeadingProps) {
  if (children.toString().charAt(0) === "@") {
    const params = children.toString().split(" ");
    const name = params[0];
    const args = params.filter((_, index: number) => index !== 0);

    switch (name) {
      // @br(n)
      case "@br1":
        return <div style={{ height: 8 }}></div>;
      case "@br2":
        return <div style={{ height: 12 }}></div>;
      case "@br3":
        return <div style={{ height: 16 }}></div>;
      case "@tag":
        return <>
          <ul className={`${common.tag} ${posts.tag}`}>
            {args.map((value: string, key: number) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </>;

      // @speaker-deck (data-id)
      case "@speaker-deck":
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

      // @row (image-path) (image-path) ...
      case "@row":
        return <>
          <div className={posts.row}>
            {args.map((value: string, key: number) => <>
              <div className={common.imageContainer}>
                <Image key={key} src={value} alt="" fill style={{ objectFit: "contain" }} />
              </div>
            </>)}
          </div>
        </>;

      // @row-link (image-path):(url) (image-path):(url) ...
      case "@row-link":
        return <>
          <div className={posts.row}>
            {args.map((value: string, key: number) => {
              const rowParams = value.split(":");
              return <>
                <div className={common.imageContainer}>
                  <a href={"https://" + rowParams[1]} target="_blank">
                    <Image key={key} src={rowParams[0]} alt="" fill style={{ objectFit: "contain" }} />
                  </a>
                </div>
              </>;
            })}
          </div>
        </>;

      default:
        return <></>;
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
    <span className={common.imageContainer}>
      <Image src={src} alt="" fill style={{ objectFit: "contain" }} />
    </span>
  </>;
}