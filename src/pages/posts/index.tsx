import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type PostData = {
  content: string
}

const Posts = ({ content }: PostData) => {
  return <>
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
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
  data.content = data.content.replaceAll(/[^\n]\n/g, "<br>\n");
  return data;
};

export default Posts;