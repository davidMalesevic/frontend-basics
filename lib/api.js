import fs from "fs";
import path from "path";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_Posts");

const getPostObjects = function (dirPath, arrayOfPosts) {
  const files = fs.readdirSync(dirPath);

  arrayOfPosts = arrayOfPosts || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfPosts = getPostObjects(dirPath + "/" + file, arrayOfPosts);
    } else {
      arrayOfPosts.push({
        path: path.join(__dirname, dirPath, "/", file),
        slug: file,
      });
    }
  });

  return arrayOfPosts;
};

export function getPostByObject(object, fields = []) {
  const realSlug = object.slug.replace(/\.md$/, "");
  const fullPath = object.path;
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
  return items;
}

export function getAllPosts(fields = []) {
  const postObjects = getPostObjects(postsDirectory);

  const posts = postObjects
    .map((post) => getPostByObject(post, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
