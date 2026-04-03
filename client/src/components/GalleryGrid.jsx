import PostCard from "./PostCard";

function GalleryGrid({ posts, onUpvote, celebrationPostId }) {
  return (
    <section className="gallery-grid">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onUpvote={onUpvote}
          celebrate={celebrationPostId === post.id}
        />
      ))}
    </section>
  );
}

export default GalleryGrid;
