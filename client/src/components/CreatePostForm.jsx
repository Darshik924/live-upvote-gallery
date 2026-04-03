import { useState } from "react";

const initialState = {
  imageUrl: "",
  title: "",
};

function CreatePostForm({ onCreate }) {
  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageFile(file);
    setFormData((current) => ({ ...current, imageFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    onCreate(formData);

    setFormData(initialState);
    setPreview(null);
    setImageFile(null);
  };

  return (
    <form className="create-post-card" onSubmit={handleSubmit}>
      <div className="section-heading">
        <h2>Create a post</h2>
        <p>Use any public image URL to simulate a new gallery post.</p>
      </div>

      <input
        type="file"
        name="img"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "8px",
            marginTop: "8px",
          }}
        />
      )}

      <input
        type="text"
        name="title"
        placeholder="Write a title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <button type="submit">Share post</button>
    </form>
  );
}

export default CreatePostForm;
