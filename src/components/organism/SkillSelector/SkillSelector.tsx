import { useEffect, useId, useMemo, useRef, useState } from "react";
import { buildSkillCategories, CategorizedSkill, SkillCategory } from "./selection";
import styles from "./SkillSelector.module.css";

type SelectionProps = {
  selected: string[];
  onToggle: (names: string[]) => void;
};

const Category = ({ category, depth, selected, onToggle }: SelectionProps & {
  category: SkillCategory;
  depth: number;
}) => {
  const [expanded, setExpanded] = useState(depth === 0);
  const childrenId = useId();
  const checkbox = useRef<HTMLInputElement>(null);
  const count = category.skillNames.filter((name) => selected.includes(name)).length;
  const allSelected = count === category.skillNames.length;
  const partiallySelected = count > 0 && !allSelected;

  useEffect(() => {
    if (checkbox.current) checkbox.current.indeterminate = partiallySelected;
  }, [partiallySelected]);

  return (
    <li className={styles.category}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.expand}
          aria-expanded={expanded}
          aria-controls={childrenId}
          aria-label={`${category.name}を${expanded ? "折りたたむ" : "展開する"}`}
          onClick={() => setExpanded((current) => !current)}
        >
          <span aria-hidden="true">{expanded ? "▾" : "▸"}</span>
        </button>
        <label className={styles.label}>
          <input
            ref={checkbox}
            type="checkbox"
            checked={allSelected}
            onChange={() => onToggle(category.skillNames)}
          />
          <span>{category.name}</span>
          <span className={styles.count}>{count}/{category.skillNames.length} 選択</span>
        </label>
      </div>
      <ul id={childrenId} className={styles.children} hidden={!expanded}>
        {category.children.map((child) => (
          <Category key={child.name} category={child} depth={depth + 1} selected={selected} onToggle={onToggle} />
        ))}
        {category.skills.map((skill) => (
          <li key={skill.name} className={styles.skill}>
            <label className={styles.label}>
              <input type="checkbox" checked={selected.includes(skill.name)} onChange={() => onToggle([skill.name])} />
              <span className={styles.skillName}>{skill.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </li>
  );
};

export const SkillSelector = ({ skills, selected, onToggle }: SelectionProps & {
  skills: CategorizedSkill[];
}) => {
  const categories = useMemo(() => buildSkillCategories(skills), [skills]);
  return (
    <ul className={styles.tree} aria-label="インストールするスキルのカテゴリ">
      {categories.map((category) => (
        <Category key={category.name} category={category} depth={0} selected={selected} onToggle={onToggle} />
      ))}
    </ul>
  );
};
