import React, { useState } from "react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) return;

    const formData = new FormData();
    formData.append("img", image);
    formData.append("title", title);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8889/api/createpost", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("Posted Image", data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

    setTitle("");
    setImage(null);
    setPreview(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 pt-20 px-6 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Upload Image</h2>

        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded-md px-3 py-2 bg-white"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
        )}

        {isLoading && <p className="text-sm text-gray-500">Uploading...</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Post Image
        </button>
      </form>
    </main>
  );
};

export default PostForm;
