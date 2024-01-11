import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ShowEveryoneBlog.css";
const ShowEveryoneBlog = () => {
  const location = useLocation();
  const { userEmail } = location.state || {};
  const [blogs, setBlogs] = useState([]);
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!userEmail) {
          console.error("User email is not available.");
          return;
        }

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

  const handleSubmit = async (e, blogEmail) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/add-blog-comment",
        {
          blogId: activeBlogId,
          ownerEmail: blogEmail,
          commentEmail: userEmail, // Assuming the comment is made by the same user
          comment: comment,
        }
      );
      if (response.data.message === "success") {
        alert("Comment added successfully!");
      } else {
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Failed to add comment:", error.message);
      alert("Failed to add comment.");
    }
    setActiveBlogId(null);
    setComment("");
  };

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
            <button onClick={() => setActiveBlogId(blog.id)}>
              Create Comment
            </button>
            {activeBlogId === blog.id && (
              <form onSubmit={(e) => handleSubmit(e, blog.email)}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowEveryoneBlog;
