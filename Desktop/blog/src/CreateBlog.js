import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudio(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform blog submission logic here
  };

  const handleLogout = () => {
    // Perform logout logic here
    navigate("/login");
  };

  const handleWatchBlog = () => {
    // Navigate to WatchBlog page
    navigate("/watch-blog");
  };

  return (
    <div className="container">
      <h1>Create Blog</h1>
      <div className="button-container">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleWatchBlog}>Watch Blog</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />

        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={handleContentChange} />

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label htmlFor="audio">Audio:</label>
        <input
          type="file"
          id="audio"
          accept="audio/*"
          onChange={handleAudioChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
