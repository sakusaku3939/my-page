import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import posts from "@/styles/posts.module.css";
import remarkGfm from "remark-gfm";
import CustomTag from "@/components/atom/custom-tag";

type PostData = {
  content: string
}

const Posts = ({ content }: PostData) => {
  return <>
    <div className={posts.post}>
      <ReactMarkdown rehypePlugins={[remarkGfm, rehypeRaw]} components={{h1: CustomTag}}>
        {content}
      </ReactMarkdown>
    </div>
  </>;
};

export async function getStaticProps() {
  const data = await fetchPostData();
  return {
    props: data
  };
}

const fetchPostData = async () => {
  const res = await fetch("http://localhost:3000/api/post");
  const data: PostData = await res.json();
  // data.content = data.content.replaceAll(/\n/g, "\n\n");
  return data;
};

export default Posts;