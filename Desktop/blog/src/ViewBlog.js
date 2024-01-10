// ViewBlog.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewBlog.css";
const ViewBlog = () => {
  const location = useLocation();
  const { blogData } = location.state || {};
  const navigate = useNavigate();
  const handleBackToCreateBlog = () => {
    // Navigate back to CreateBlog view
    navigate("/create-blog");
  };
  return (
    <div className="container">
      {blogData && (
        <>
          <h1>{blogData.title}</h1>
          <p>{blogData.content}</p>
          <img src={blogData.image} alt="Blog" style={{ maxWidth: "100%" }} />
          <audio controls>
            <source src={blogData.audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button onClick={handleBackToCreateBlog}>Back to CreateBlog</button>
        </>
      )}
    </div>
  );
};

export default ViewBlog;
