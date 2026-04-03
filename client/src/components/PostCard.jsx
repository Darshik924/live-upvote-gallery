function PostCard({ post, onUpvote, celebrate }) {
  const milestoneReached = post.upvotes > 0 && post.upvotes % 10 === 0;

  return (
    <article className={`post-card ${celebrate ? "celebrate" : ""}`}>
      {celebrate && (
        <div className="confetti-strip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      <img
        src={post.imageUrl}
        alt={post.title}
        className="post-image"
      />
      {/* Something in the Images (maybe cloudinary url converts) are causing the images to be awfully big so added a few css over here */}

      <div className="post-content">
        <p className="caption">{post.title}</p>

        <div className="post-footer">
          <button className="upvote-button" onClick={() => onUpvote(post.id)}>
            Upvote
          </button>
          <div className="vote-stack flex gap-2">
            <strong>{post.upvotes}</strong>
            <span>live votes</span>
          </div>
        </div>

        {milestoneReached && (
          <p className="milestone-badge">Milestone unlocked</p>
        )}
      </div>
    </article>
  );
}

export default PostCard;
