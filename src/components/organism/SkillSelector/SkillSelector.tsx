import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { buildSkillCategories, CategorizedSkill, SkillCategory } from "./selection";
import styles from "./SkillSelector.module.css";

type SelectionProps<T extends CategorizedSkill> = {
  selected: string[];
  onToggle: (names: string[]) => void;
  renderSkill: (skill: T) => ReactNode;
};

const Category = <T extends CategorizedSkill,>({ category, selected, onToggle, renderSkill, isRoot = false }: SelectionProps<T> & {
  category: SkillCategory<T>;
  isRoot?: boolean;
}) => {
  const isSection = isRoot && category.children.some((child) => child.children.length > 0);
  const collapsible = !isSection && (isRoot || category.children.length > 0);
  const checkbox = useRef<HTMLInputElement>(null);
  const count = category.skillNames.filter((name) => selected.includes(name)).length;
  const allSelected = count === category.skillNames.length;
  const partiallySelected = count > 0 && !allSelected;
  const selectionLabel = allSelected
    ? `${category.skillNames.length}件すべて選択`
    : count === 0 ? "未選択" : `${count} / ${category.skillNames.length}件選択`;

  useEffect(() => {
    if (checkbox.current) checkbox.current.indeterminate = partiallySelected;
  }, [partiallySelected, collapsible]);

  const heading = (
    <span className={styles.label}>
      {collapsible && (
        <input
          ref={checkbox}
          type="checkbox"
          aria-label={`${category.name} ${selectionLabel}`}
          checked={allSelected}
          onChange={() => onToggle(category.skillNames)}
        />
      )}
      <span className={styles.categoryName}>{category.name}</span>
      {collapsible && <span className={styles.count}>{selectionLabel}</span>}
    </span>
  );
  const children = (
    <ul className={styles.children}>
      {category.children.map((child) => (
        <Category key={child.name} category={child} selected={selected} onToggle={onToggle} renderSkill={renderSkill} />
      ))}
      {category.skills.map((skill) => (
        <li key={skill.name} className={styles.skill}>
          {renderSkill(skill)}
        </li>
      ))}
    </ul>
  );

  return (
    <li className={isRoot ? styles.section : styles.category}>
      {collapsible ? (
        <details className={styles.accordion} open>
          <summary className={styles.row}>{heading}</summary>
          {children}
        </details>
      ) : (
        <>
          <h3 className={isSection ? styles.sectionTitle : styles.subheading}>{category.name}</h3>
          {children}
        </>
      )}
    </li>
  );
};

export const SkillSelector = <T extends CategorizedSkill,>({ skills, selected, onToggle, renderSkill }: SelectionProps<T> & {
  skills: T[];
}) => {
  const categories = useMemo(() => buildSkillCategories(skills), [skills]);
  return (
    <ul className={styles.tree} aria-label="配布中のスキルのカテゴリ">
      {categories.map((category) => (
        <Category key={category.name} isRoot category={category} selected={selected} onToggle={onToggle} renderSkill={renderSkill} />
      ))}
    </ul>
  );
};
