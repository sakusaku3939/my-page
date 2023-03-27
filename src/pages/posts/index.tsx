import posts from "@/styles/posts.module.css";
import common from "@/styles/common.module.css";
import { getAllPostOverview } from "@/model/PostApi";

type Props = {
  overviews: {[p: string]: any}[],
}

const Index = ({ overviews }: Props) => {
  return (
    <>
      {overviews.map((overview: any) =>
        <>
          <div>{overview.title}</div>
        </>
      )}
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPostOverview();
  return {
    props: { overviews: posts }
  };
}

export default Index;