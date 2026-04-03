import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";

const App = () => {
  const [imagesArray, setPosts] = useState([]);

  return (
    <div>
      <Navbar />
      <Gallery imagesArray={imagesArray} setPosts={setPosts} />
    </div>
  );
};

export default App;
