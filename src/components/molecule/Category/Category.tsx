import category from "@/components/molecule/Category/Category.module.css";
import common from "@/styles/common.module.css";
import { renderCountTags } from "@/model/PostClient";
import { useRouter } from "next/router";

type Props = {
  categories: { [tag: string]: number }[],
}

const Category = ({ categories }: Props) => {
  const router = useRouter();
  return <>
    <aside className={category.aside}>
      <div className={`${common.shadow} ${category.skin}`}>
        <h1>すべてのカテゴリー</h1>
        {categories.length === 0 ? (
          <PlaceholderCategory />
        ) : (
          <ul className={common.tag}>
            {renderCountTags(router, categories)}
          </ul>
        )}
      </div>
    </aside>
  </>;
};

const PlaceholderCategory = () => {
  return (
    <ul className={`${common.tag} ${category.placeholderTag}`}>
      {Array(16).fill(0).map((_, i) => <li key={i}>&nbsp;</li>)}
    </ul>
  );
};

export default Category;