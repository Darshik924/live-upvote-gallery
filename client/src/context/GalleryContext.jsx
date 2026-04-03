import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getSocket } from "../services/socket";
const API = import.meta.env.VITE_API_URL;

const GalleryContext = createContext(null);

const socket = getSocket();
/* Created the socket object Once and use it everywhere for upvotes */

/* Traditional way of communication is client asking for things and server responds with a few things */
/* How is works is - client opens app → socket connects → server says "user connected" */
/* Emit — either side sends a named event with data: */
/* On — either side listens for events: */

/* socket.emit(...)  → sends to ONE specific client
   io.emit(...)      → broadcasts to ALL connected clients */

/* This is why upvotes appear for everyone — server receives from one user via socket.emit, then broadcasts to all via io.emit. */

export function GalleryProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [celebrationPostId, setCelebrationPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:8889/api/posts`);
      const data = await res.json();

      const normalized = data.map((post) => ({
        ...post,
        id: post._id,
      }));

      /* In our backend we do not have an id property so i have normalized the posts with defining an id property which revolves everywhere and differentiates the code */

      setPosts(normalized);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }
    socket.on("connect", () => {
      console.log("Connected to the CLient");
    });
    socket.emit("message", "Welcome server");

    /* So how will this work is basically when some user A let's say upvotes an image then he will see the count go up and an event will be emitted which is post:upvote - Simply that one updates the Db and then over there another Socket event gets emitted which is post:upvoteSync - Now the real game changes as we have a function over here which will be triggered and all the users which are connected to the server will be able to see the count go up instantly as someone upvotes--- THis is the complete walkthrought */

    const handleUpvoteSync = ({ postId, upvotes }) => {
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId ? { ...post, upvotes } : post,
        ),
      );

      if (upvotes > 0 && upvotes % 10 === 0) {
        triggerCelebration(postId);
      }
    };

    socket.on("post:upvoteSync", handleUpvoteSync);

    return () => {
      socket.off("connect");
      socket.off("post:upvoteSync", handleUpvoteSync);
    };
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const triggerCelebration = (postId) => {
    setCelebrationPostId(postId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCelebrationPostId(null);
    }, 1800);
  };

  const upvotePost = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        const nextUpvotes = post.upvotes + 1;
        if (nextUpvotes % 10 === 0) triggerCelebration(postId);

        return { ...post, upvotes: nextUpvotes };
      }),
    );

    /*  Emit AFTER state update, outside the map */
    if (socket) {
      socket.emit("post:upvote", { postId });
    }
  };

  const addPost = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("img", formData.imageFile);

      const res = await fetch(`http://localhost:8889/api/createpost`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const newPost = await res.json();

      setPosts((currentPosts) => [
        { ...newPost, id: newPost._id },
        ...currentPosts,
      ]);
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };
  /* Add to post is modified by me so that now it can post images on the backend */

  const value = useMemo(
    () => ({
      posts,
      celebrationPostId,
      upvotePost,
      addPost,
      setPosts,
    }),
    [posts, celebrationPostId],
  );

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

export function useGallery() {
  return useContext(GalleryContext);
}
