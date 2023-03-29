import category from "@/components/molecule/Category/Category.module.css";
import common from "@/styles/common.module.css";

const Category = () => {
  return <>
    <aside className={category.aside}>
      <div className={`${common.shadow} ${category.skin}`}>
        <h1>すべてのカテゴリー</h1>
        <ul className={common.tag}>
          <li>Android / iOS (3)</li>
          <li>Flutter (2)</li>
          <li>Dart (2)</li>
          <li>アプリ甲子園 (1)</li>
        </ul>
      </div>
    </aside>
  </>;
};

export default Category