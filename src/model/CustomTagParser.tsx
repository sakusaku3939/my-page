import { HeadingProps } from "react-markdown/lib/ast-to-react";
import common from "@/styles/common.module.css";
import posts from "@/styles/posts.module.css";

export function CustomTagParser({ className, children }: HeadingProps) {
  if (children.toString().charAt(0) === "@") {
    const params = children.toString().split(" ");
    const name = params[0];
    const args = params.filter((_, index: number) => index !== 0);

    switch (name) {
      case "@br":
        return <div style={{ height: 12 }}></div>;
      case "@tag":
        return <>
          <ul className={`${common.tag} ${posts.tag}`}>
            {args.map((value: string, key: number) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </>;
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
      default:
        return <></>;
    }
  }

  return <h1 className={className}>{children}</h1>;
}