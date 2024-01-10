import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CreateBlog.css";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [fontSizeTitle, setFontSizeTitle] = useState(14);
  const [fontSizeContent, setFontSizeContent] = useState(14);
  const [selectedContentFont, setSelectedFont] = useState("Calibri");
  const [selectedTitleFont, setTitleFont] = useState("Calibri");
  const location = useLocation();
  const { userEmail } = location.state || {};
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
    console.log(userEmail);
    const blogData = {
      title,
      content,
      image, // Assuming you have the image data or file URL
      audio, // Assuming you have the audio data or file URL
    };

    // Navigate to ViewBlog with the blogData as state
    navigate(`/view-blog`, { state: { blogData } });
  };

  const handleLogout = () => {
    // Perform logout logic here
    navigate("/login");
  };

  const handleWatchBlog = () => {
    // Navigate to WatchBlog page
    navigate("/watch-blog");
  };
  const handleTitleFontSizeIncrease = () => {
    setFontSizeTitle((prevSize) => prevSize + 1);
  };

  const handleTitleFontSizeDecrease = () => {
    setFontSizeTitle((prevSize) => Math.max(prevSize - 1, 1));
  };

  const handleContentFontSizeIncrease = () => {
    setFontSizeContent((prevSize) => prevSize + 1);
  };

  const handleContentFontSizeDecrease = () => {
    setFontSizeContent((prevSize) => Math.max(prevSize - 1, 1));
  };

  const handleContentFontChange = (font) => {
    setSelectedFont(font);
  };
  const handleTitleFontChange = (font) => {
    setTitleFont(font);
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
          style={{
            fontSize: `${fontSizeTitle}px`,
            fontFamily: selectedTitleFont,
          }}
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <div>
          <span>Title font size: </span>
          <button
            type="button"
            style={{ fontSize: "16px", marginRight: "8px" }}
            onClick={() => handleTitleFontSizeIncrease()}
          >
            +
          </button>
          <button
            type="button"
            style={{ fontSize: "16px" }}
            onClick={() => handleTitleFontSizeDecrease()}
          >
            -
          </button>
        </div>

        <div>
          <label>Choose Title Font:</label>
          <div>
            <button
              style={{ fontSize: "12px", marginRight: "8px" }}
              type="button"
              onClick={() => handleTitleFontChange("sans-serif")}
            >
              Sans-serif
            </button>
            <button
              style={{ fontSize: "12px", marginRight: "8px" }}
              type="button"
              onClick={() => handleTitleFontChange("serif")}
            >
              Serif
            </button>
            {/* Add more font options as needed */}
          </div>
        </div>

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          style={{
            fontSize: `${fontSizeContent}px`,
            fontFamily: selectedContentFont,
          }}
          onChange={handleContentChange}
        />
        <div>
          <span>Content font size: </span>
          <button
            type="button"
            style={{ fontSize: "16px", marginRight: "8px" }}
            onClick={() => handleContentFontSizeIncrease()}
          >
            +
          </button>
          <button
            type="button"
            style={{ fontSize: "16px" }}
            onClick={() => handleContentFontSizeDecrease()}
          >
            -
          </button>
        </div>

        <div>
          <label>Choose Content Font:</label>
          <div>
            <button
              style={{ fontSize: "12px", marginRight: "8px" }}
              type="button"
              onClick={() => handleContentFontChange("sans-serif")}
            >
              Sans-serif
            </button>
            <button
              style={{ fontSize: "12px", marginRight: "8px" }}
              type="button"
              onClick={() => handleContentFontChange("serif")}
            >
              Serif
            </button>
            {/* Add more font options as needed */}
          </div>
        </div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label htmlFor="audio">Audio URL:</label>
        <input
          type="text"
          id="audio"
          placeholder="Enter audio URL"
          value={audio}
          onChange={(e) => setAudio(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
