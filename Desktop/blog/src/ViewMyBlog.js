import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ViewMyBlog.css";

const ViewMyBlog = () => {
  const location = useLocation();
  const { blogs, userEmail } = location.state || {};
  const [fetchedBlogs, setFetchedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!blogs) {
          const response = await axios.post(
            "http://localhost:8000/get-blogs-by-email",
            {
              email: userEmail,
            }
          );
          setFetchedBlogs(response.data.blogs);
        } else {
          setFetchedBlogs(blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error.message);
      }
    };

    fetchBlogs();
  }, [blogs, userEmail]);

  return (
    <div className="container">
      <h1>Your Blogs</h1>
      <div className="blog-container">
        {fetchedBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            -------------------------------------------------------------------------------------------------------------
            <h2>Title: {blog.title}</h2>
            <h3>Content</h3>
            <p className="blog-content">{blog.content}</p>
            <img src={blog.image} alt="Không có ảnh" className="blog-image" />
            <audio controls className="audio-controls">
              <source src={blog.audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMyBlog;
