import category from "@/components/molecule/MobileCategory/MobileCategory.module.css";
import common from "@/styles/common.module.css";
import { renderCountTags } from "@/model/PostApi";
import { useRouter } from "next/router";

type Props = {
  categories: { [tag: string]: number }[],
}

const MobileCategory = ({ categories }: Props) => {
  const router = useRouter();
  return <>
    <div className={category.tag}>
      <ul className={common.tag}>
        {renderCountTags(router, categories)}
      </ul>
    </div>
  </>;
};
export default MobileCategory;