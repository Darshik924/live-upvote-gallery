import React from "react";

const ImageCard = ({ post }) => {
  const handleUpvote = () => {
    console.log("Upvoted:", post._id);
  };

  return (
    <div className="bg-white rounded-xl h-100 shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={post.imageUrl}
        alt="Post"
        className="w-full h-84 object-cover"
      />

      <div className="flex items-center justify-between p-4">
        <span className="text-gray-700 font-semibold">🔥 {post.upvotes}</span>
        <div className="p-2 font-semibold font-sans rounded-2xl bg-white text-gray-800">
          {post.title}
        </div>

        <button
          onClick={handleUpvote}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition cursor-pointer"
        >
          ▲ Upvote
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
