import Avatar from "../components/avatar";
import DateFormatter from "../components/date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  category,
  date,
  link,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5"></div>
      <h3 className="text-5xl mb-1 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <h3 className="text-xl mb-3 font-black">{category}</h3>

      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <div className="text-lg mb-4">
        <a className="hover:underline" href={link}>
          {link}
        </a>
      </div>
    </div>
  );
}
