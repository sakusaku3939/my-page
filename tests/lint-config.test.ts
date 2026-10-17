import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ESLint } from "eslint";

test("flat config keeps React Hooks diagnostics active for TypeScript", async () => {
  const eslint = new ESLint();
  const [result] = await eslint.lintText(`
    import { useEffect, useState } from "react";
    export function useInvalidBrowserState() {
      const [value, setValue] = useState(false);
      useEffect(() => { setValue(true); }, []);
      return value;
    }
  `, { filePath: "src/hooks/lint-regression-fixture.ts" });
  assert.ok(result.messages.some(message =>
    message.ruleId === "react-hooks/set-state-in-effect" && message.severity === 2
  ));
});

test("flat config retains the Next image warning instead of suppressing it", async () => {
  const eslint = new ESLint();
  const [result] = await eslint.lintText(
    'export default function Preview() { return <img src="/photo.jpg" alt="Preview" />; }',
    { filePath: "src/components/lint-regression-fixture.tsx" }
  );
  assert.ok(result.messages.some(message =>
    message.ruleId === "@next/next/no-img-element" && message.severity === 1
  ));
});

test("generated blur-map output no longer includes a blanket lint suppression", () => {
  const generator = readFileSync("scripts/generate-blur-images-map.ts", "utf8");
  assert.doesNotMatch(generator, /eslint-disable/);
});
