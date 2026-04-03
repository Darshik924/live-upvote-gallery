import React, { useEffect, useState } from "react";
import { useGallery } from "../context/GalleryContext";
import GalleryGrid from "../components/GalleryGrid";
import CreatePostForm from "../components/CreatePostForm";
const API = import.meta.env.VITE_API_URL;
const Gallery = () => {
  const { posts, celebrationPostId, upvotePost, addPost, setPosts } =
    useGallery();

  const [isLoading, setLoading] = useState(false);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:8889/api/posts`);
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
    <main className="min-h-screen py-20">
      <main className="gallery-page min-h-screen py-20">
        <header className="gallery-header">
          <div>
            <p className="eyebrow">Realtime upvotes</p>
            <h1>Pulse Gallery</h1>
            <p className="header-copy">
              Upload visuals, watch votes jump instantly, and celebrate
              milestone moments.
            </p>
          </div>
        </header>

        <section className="gallery-layout">
          <aside>
            <CreatePostForm onCreate={addPost} />
            <div className="info-card">
              <h3>Frontend features covered</h3>
              <ul>
                <li>
                  Realtime-ready upvote updates with Socket.io client support
                </li>
                <li>Milestone confetti animation on every 10th upvote</li>
                <li>Reusable component-based React structure</li>
              </ul>
            </div>
          </aside>

          <GalleryGrid
            posts={posts}
            onUpvote={upvotePost}
            celebrationPostId={celebrationPostId}
          />
        </section>
      </main>

      {isLoading && (
        <div className="flex justify-center flex-col items-center text-red-800 font-bold font-sans p-3">
          Please Wait for the Server
        </div>
      )}

      {posts.length === 0 && (
        <div className="flex justify-center flex-col items-center text-red-800 font-bold font-sans p-3">
          There are no Posts Yet!
        </div>
      )}
    </main>
  );
};

export default Gallery;
