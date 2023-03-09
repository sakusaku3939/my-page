import { HeadingProps } from "react-markdown/lib/ast-to-react";
import common from "@/styles/common.module.css";
import posts from "@/pages/posts/Posts.module.css";

const CustomTagParser = ({ className, children }: HeadingProps) => {
  if (children.toString().charAt(0) === "@") {
    const params = children.toString().split(":");
    const name = params[0];
    const args = params.filter((_, index: number) => index !== 0);

    switch (name) {
      case "@br":
        return <br />;
      case "@tag":
        return <>
          <ul className={`${common.tag} ${posts.tag}`}>
            {args.map((value: string, key: number) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </>;
    }
  }

  return <h1 className={className}>{children}</h1>;
};

export default CustomTagParser;