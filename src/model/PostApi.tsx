import path from "path";
import fs from "fs";

function fetchPostData(name: string) {
  const fullPath = path.join(process.cwd(), "src/posts/", `${name}.md`);
  return fs.readFileSync(fullPath, "utf8");
}

export default fetchPostData