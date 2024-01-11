// ShowEveryoneBlog.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ShowEveryoneBlog = () => {
  const location = useLocation();
  const { userEmail } = location.state || {};
  const [blogs, setBlogs] = useState([]);
  const [fetchedBlogs, setFetchedBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!userEmail) {
          console.error("User email is not available.");
          return;
        }

        // Check if blogs are already available, if yes, don't make the request again
        if (!blogs || blogs.length === 0) {
          const response = await axios.post(
            "http://localhost:8000/get-blog-except-email",
            { email: userEmail }
          );
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error.message);
      }
    };

    fetchBlogs();
  }, [userEmail, blogs]);

  return (
    <div>
      <h1>Everyone's Blogs</h1>
      <div className="blog-container">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <h3>Người đăng {blog.email}</h3>
            <p className="blog-content">{blog.content}</p>
            <img src={blog.image} alt="No image" className="blog-image" />
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

export default ShowEveryoneBlog;
