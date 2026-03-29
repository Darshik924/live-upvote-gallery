import React from 'react';
import socket from '../socket';
import confetti from 'canvas-confetti';

const ImageCard = ({ post }) => {
  const handleUpvote = () => {
    socket.emit("upvote_post", post._id);
  };

  // Trigger confetti if milestone is hit (e.g., multiples of 10)
  // This logic runs when the 'post' prop updates via socket in the parent
  React.useEffect(() => {
    if (post.upvotes > 0 && post.upvotes % 10 === 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [post.upvotes]);

  return (
    <div className="card">
      <img src={post.imageUrl} alt="Post" style={{ width: '100%' }} />
      <div className="info">
        <span>🔥 {post.upvotes} Upvotes</span>
        <button onClick={handleUpvote} className="upvote-btn">
          ▲ Upvote
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
