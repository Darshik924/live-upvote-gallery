import React, { useState } from "react";
import PostForm from "./pages/PostForm";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";

const App = () => {
  const [imagesArray, setPosts] = useState([]);

  return (
    <div>
      {/* <PostForm/> */}
      <Navbar />
      <Gallery imagesArray={imagesArray} setPosts={setPosts} />
    </div>
  );
};

export default App;
