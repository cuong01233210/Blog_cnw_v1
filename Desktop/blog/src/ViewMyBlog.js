// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import "./ViewMyBlog.css";

// const ViewMyBlog = () => {
//   const location = useLocation();
//   const { blogs, userEmail } = location.state || {};
//   const [fetchedBlogs, setFetchedBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         if (!blogs) {
//           const response = await axios.post(
//             "http://localhost:8000/get-blogs-by-email",
//             {
//               email: userEmail,
//             }
//           );
//           setFetchedBlogs(response.data.blogs);
//         } else {
//           setFetchedBlogs(blogs);
//         }
//       } catch (error) {
//         console.error("Failed to fetch blogs:", error.message);
//       }
//     };

//     fetchBlogs();
//   }, [blogs, userEmail]);

//   return (
//     <div className="container">
//       <h1>Your Blogs</h1>
//       <div className="blog-container">
//         {fetchedBlogs.map((blog) => (
//           <div key={blog.id} className="blog-card">
//             -------------------------------------------------------------------------------------------------------------
//             <h2>Title: {blog.title}</h2>
//             <h3>Content</h3>
//             <p className="blog-content">{blog.content}</p>
//             <img src={blog.image} alt="Không có ảnh" className="blog-image" />
//             <audio controls className="audio-controls">
//               <source src={blog.audio} type="audio/mp3" />
//               Your browser does not support the audio element.
//             </audio>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewMyBlog;

// In ViewMyBlog.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import "./ViewMyBlog.css";
// const ViewMyBlog = ({ userEmail }) => {
//   const location = useLocation();
//   const { blogs } = location.state || {};
//   const [fetchedBlogs, setFetchedBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         // If blogs are not passed through location state, fetch them using userEmail
//         if (!blogs) {
//           const response = await axios.post(
//             "http://localhost:8000/get-blogs-by-email",
//             {
//               email: userEmail,
//             }
//           );
//           setFetchedBlogs(response.data);
//         } else {
//           setFetchedBlogs(blogs);
//         }
//       } catch (error) {
//         console.error("Failed to fetch blogs:", error.message);
//       }
//     };

//     fetchBlogs();
//   }, [blogs, userEmail]);

//   return (
//     <div>
//       <h1 style={{ color: "red", marginBottom: "30px" }}>Your Blogs</h1>
//       {fetchedBlogs.map((blog) => (
//         <div key={blog.id}>
//           <h2>{blog.title}</h2>
//           <p>{blog.content}</p>
//           <img src={blog.image} alt="Blog" style={{ maxWidth: "100%" }} />
//           <audio controls>
//             <source src={blog.audio} type="audio/mp3" />
//             Your browser does not support the audio element.
//           </audio>
//           {/* Display comments for each blog */}
//           <h3>Comments:</h3>
//           {blog.comments && blog.comments.length > 0 ? (
//             <ul>
//               {blog.comments.map((comment) => (
//                 <li key={comment.id}>{comment.comment}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No comments for this blog.</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewMyBlog;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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

      // Fetch updated comments after deletion
      const response = await axios.post(
        "http://localhost:8000/get-blog-comments-by-blog-id",
        { blogId }
      );

      // Update the state with the updated comments
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
    <div>
      <h1 style={{ color: "red", marginBottom: "30px" }}>Your Blogs</h1>
      {fetchedBlogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <img src={blog.image} alt="Blog" />
          <audio controls>
            <source src={blog.audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <h3>Comments:</h3>
          {blog.comments && blog.comments.length > 0 ? (
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment.id}>
                  {comment.comment}
                  <button
                    onClick={() => handleDeleteComment(blog.id, comment.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments for this blog.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewMyBlog;
