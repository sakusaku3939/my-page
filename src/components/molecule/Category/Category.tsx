import category from "@/components/molecule/Category/Category.module.css";
import common from "@/styles/common.module.css";

type Props = {
  tags: { [tag: string]: number }[],
}

const Category = ({ tags }: Props) => {
  return <>
    <aside className={category.aside}>
      <div className={`${common.shadow} ${category.skin}`}>
        <h1>すべてのカテゴリー</h1>
        <ul className={common.tag}>
          {tags.map((category: any, key) =>
            <>
              <li key={key}>{category.tag} ({category.count})</li>
            </>
          )}
        </ul>
      </div>
    </aside>
  </>;
};
export default Category