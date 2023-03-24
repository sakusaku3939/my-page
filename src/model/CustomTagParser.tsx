import { HeadingProps } from "react-markdown/lib/ast-to-react";
import common from "@/styles/common.module.css";
import posts from "@/styles/posts.module.css";

export function CustomTagParser({ className, children }: HeadingProps) {
  if (children.toString().charAt(0) === "@") {
    const params = children.toString().split(",");
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
      default:
        return <></>
    }
  }

  return <h1 className={className}>{children}</h1>;
}
