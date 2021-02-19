import fs from "fs";
import path from "path";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_Posts");
const iadPostsDirectory = join(process.cwd(), "iadPosts");
const codePostsDirectory = join(process.cwd(), "iadPosts/code");
const designPostsDirectory = join(process.cwd(), "iadPosts/design");
const konzeptPostsDirectory = join(process.cwd(), "iadPosts/konzept");

export function old_getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

const getPostSlugs = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getPostSlugs(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push({
        path: path.join(__dirname, dirPath, "/", file),
        slug: file,
      });
    }
  });

  return arrayOfFiles;
};

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  console.log(fullPath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });
  // console.log(fs.readdirSync(postsDirectory));
  // console.log(fs.readdirSync(codePostsDirectory));
  // console.log(fs.readdirSync(designPostsDirectory));
  // console.log(fs.readdirSync(konzeptPostsDirectory));
  return items;
}

export function getAllPosts(fields = []) {
  const slugs = old_getPostSlugs();
  const arrayOfFiles = getPostSlugs(iadPostsDirectory);
  console.log(slugs);
  console.log(arrayOfFiles);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
