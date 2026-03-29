import React, { useState } from "react";
import PostForm from "./pages/PostForm";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";

const App = () => {
  const [imagesArray, setPosts] = useState([]);
  const [view, setView] = useState("gallery");

  return (
    <div>
      {/* <PostForm/> */}
      <Navbar setView={setView} />
      {view === "gallery" && (
        <Gallery imagesArray={imagesArray} setPosts={setPosts} />
      )}
      {view === "upload" && <PostForm />}
    </div>
  );
};

export default App;
