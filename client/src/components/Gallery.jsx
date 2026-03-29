import React from "react";
import ImageCard from "./ImageCard";

const Gallery = () => {
  const Arr = [1, 2, 3, 4, 45, 6];

  return (
    <main className="flex flex-wrap gap-10 pt-17 min-h-screen">
      {Arr.map((ele) => (
        <ImageCard key={ele} />
      ))}
    </main>
  );
};

export default Gallery;
