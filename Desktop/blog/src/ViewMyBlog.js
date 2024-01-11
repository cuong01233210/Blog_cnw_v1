import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewMyBlog.css";

const ViewMyBlog = () => {
  const location = useLocation();
  const { blogs, userEmail } = location.state || {};
  const [fetchedBlogs, setFetchedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!blogs) {
          const response = await axios.post(
            "http://localhost:8000/get-blogs-by-email",
            { email: userEmail }
          );
          setFetchedBlogs(response.data);
        } else {
          setFetchedBlogs(blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error.message);
      }
    };

    fetchBlogs();
  }, [blogs, userEmail]);

  const handleDeleteComment = async (blogId, commentId) => {
    try {
      await axios.delete("http://localhost:8000/delete-blog-comment", {
        data: { id: commentId },
      });

      const response = await axios.post(
        "http://localhost:8000/get-blog-comments-by-blog-id",
        { blogId }
      );

      setFetchedBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, comments: response.data.comments }
            : blog
        )
      );
    } catch (error) {
      console.error("Failed to delete comment:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Your Blogs</h1>
      <div className="blog-container">
        {fetchedBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
            <img src={blog.image} alt="No image" className="blog-image" />
            <audio controls className="audio-controls">
              <source src={blog.audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            {blog.comments && blog.comments.length > 0 && (
              <div>
                <h3>Comments:</h3>
                <ul>
                  {blog.comments.map((comment) => (
                    <li key={comment.id}>
                      {comment.comment}
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteComment(blog.id, comment.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMyBlog;
