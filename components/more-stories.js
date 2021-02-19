import PostPreview from "../components/post-preview";

export default function MoreStories({ posts }) {
  return (
    <section>
      <div className="grid grid-cols-1">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            link={post.link}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
