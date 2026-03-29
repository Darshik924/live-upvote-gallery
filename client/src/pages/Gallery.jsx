import React, { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";

const Gallery = ({ imagesArray, setPosts }) => {
  const [isLoading, setLoading] = useState(false);

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
    <main className="min-h-screen bg-gray-100 py-20 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Image Gallery</h1>

      {isLoading && (
        <div className="flex justify-center flex-col items-center text-red-800 font-bold font-sans p-3">
          Please Wait for the Server
        </div>
      )}

      {imagesArray.length === 0 ? (
        <div className="flex justify-center flex-col items-center text-red-800 font-bold font-sans p-3">
          There are no Posts Yet!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagesArray.map((ele, idx) => (
            <ImageCard key={idx} post={ele} />
          ))}
        </div>
      )}
      
    </main>
  );
};

export default Gallery;
