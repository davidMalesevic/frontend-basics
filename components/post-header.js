import Avatar from "../components/avatar";
import DateFormatter from "../components/date-formatter";
import PostTitle from "../components/post-title";

export default function PostHeader({ title, coverImage, date, category }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <div className="text-2xl mb-3">{category}</div>
      </div>
    </>
  );
}
