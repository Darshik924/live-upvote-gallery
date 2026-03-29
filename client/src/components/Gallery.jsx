import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const Gallery = () => {
  const [isLoading, setLoading] = useState(false);
  const [imagesArray, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8889/api/posts");
      const data = await res.json();

      setPosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 pt-20 px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Image Gallery</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imagesArray.map((ele, idx) => (
          <ImageCard key={idx} post={ele} />
        ))}
      </div>
    </main>
  );
};

export default Gallery;
