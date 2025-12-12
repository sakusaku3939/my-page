import category from "@/components/molecule/MobileCategory/MobileCategory.module.css";
import common from "@/styles/common.module.css";
import { renderCountTags } from "@/model/PostClient";
import { useRouter } from "next/router";
import { memo } from "react";

type Props = {
  categories: { [tag: string]: number }[],
}

const MobileCategory = memo(({ categories }: Props) => {
  const router = useRouter();
  if (categories.length === 0) {
    return <PlaceholderMobileCategory />;
  }
  return <>
    <div className={category.tag}>
      <ul className={common.tag}>
        {renderCountTags(router, categories)}
      </ul>
    </div>
  </>;
});

const PlaceholderMobileCategory = ({}) => {
  return (
    <div className={category.tag}>
      <ul className={`${common.tag} ${category.placeholder}`}>
        {Array(10).fill(0).map((_, i) => <li key={i}>&nbsp;</li>)}
      </ul>
    </div>
  );
};

MobileCategory.displayName = "MobileCategory";

export default MobileCategory;