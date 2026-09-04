export type CategorizedSkill = {
  name: string;
  category_path: string[];
};

export type SkillCategory<T extends CategorizedSkill = CategorizedSkill> = {
  name: string;
  children: SkillCategory<T>[];
  skills: T[];
  skillNames: string[];
};

export const isCategoryPath = (value: unknown): value is string[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((part) => typeof part === "string" && part.length > 0 && part.trim() === part);

export const buildSkillCategories = <T extends CategorizedSkill>(skills: T[]): SkillCategory<T>[] => {
  const roots: SkillCategory<T>[] = [];
  for (const skill of skills) {
    let siblings = roots;
    let category: SkillCategory<T> | undefined;
    for (const name of skill.category_path) {
      category = siblings.find((item) => item.name === name);
      if (!category) {
        category = { name, children: [], skills: [], skillNames: [] };
        siblings.push(category);
      }
      category.skillNames.push(skill.name);
      siblings = category.children;
    }
    category?.skills.push(skill);
  }
  return roots;
};

export const toggleSkillNames = (selected: string[], names: string[]): string[] => {
  const targets = new Set(names);
  return names.every((name) => selected.includes(name))
    ? selected.filter((name) => !targets.has(name))
    : Array.from(new Set([...selected, ...names]));
};
