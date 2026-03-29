import React from "react";

const ImageCard = ({ post }) => {
  // Dummy fallback (so it works even without backend)
  const dummyPost = {
    imageUrl: "https://picsum.photos/400/300",
    upvotes: 12,
    _id: "1",
  };

  const data = post || dummyPost;

  const handleUpvote = () => {
    console.log("Upvoted:", data._id);
    // socket.emit("upvote_post", data._id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      <img
        src={data.imageUrl}
        alt="Post"
        className="w-full h-48 object-cover"
      />

      {/* Info Section */}
      <div className="flex items-center justify-between p-4">
        {/* Upvotes */}
        <span className="text-gray-700 font-semibold">🔥 {data.upvotes}</span>

        {/* Button */}
        <button
          onClick={handleUpvote}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
        >
          ▲ Upvote
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
