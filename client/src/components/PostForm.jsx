import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    await axios.post("http://localhost:5000/api/posts", { imageUrl: url });
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input 
        type="text" 
        placeholder="Enter Image URL..." 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
      />
      <button type="submit">Post Image</button>
    </form>
  );
};

export default PostForm;
