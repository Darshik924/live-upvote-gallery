import React from "react";
// import ImageCard from "./ImageCard";

const Gallery = () => {
  const Arr = [1, 2, 3, 4, 45, 6];

  return (
    <main className="min-h-screen bg-gray-100 pt-20 px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Image Gallery</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Arr.map((ele) => (
          <ImageCard key={ele} />
        ))}
      </div>
    </main>
  );
};

export default Gallery;
