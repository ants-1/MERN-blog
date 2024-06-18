import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { jwtDecode } from "jwt-decode";

function PostCard({ post }) {
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null);
    }
  }, [token]);

  const isAdmin = decodedToken?.user?.is_admin;
  const currentUser = decodedToken?.user?._id;
  const isAuthor = post.author === currentUser;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Post deleted successfully");
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    
    setShowConfirmDelete(false);
  };

  const showDeleteConfirmation = () => {
    setShowConfirmDelete(true);
  };

  const hideDeleteConfirmation = () => {
    setShowConfirmDelete(false);
  };

  const truncatedContent =
    post.content.length > 60
      ? `${post.content.substring(0, 60)}...`
      : post.content;
  const postUrl = `/posts/${post._id}`;

  return (
    <div className="max-w-sm bg-green-200 border border-gray-400 rounded-lg shadow-md mb-10 h-[25rem] w-96 flex flex-col justify-between">
      <Link to={postUrl}>
        <img className="rounded-t-lg h-52 bg-white" src="" alt="" />
      </Link>
      <div className="p-5">
        <Link to={postUrl}>
          <h5 className="mb-2 text-2xl font-semi-bold">{post.title}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 h-16">
          {truncatedContent}
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={postUrl}
            className="inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Read more
          </Link>
          {isLoggedIn && (isAdmin || isAuthor) && (
            <div className="flex gap-5">
              <Link to={`/edit/${post._id}`}>
                <img src="/edit-icon.png" alt="Edit Icon" className="h-5 w-5" />
              </Link>
              <button onClick={showDeleteConfirmation} className="cursor-pointer">
                <img
                  src="/delete-icon.png"
                  alt="Delete Icon"
                  className="h-5 w-5"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      {isLoggedIn && showConfirmDelete && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="mb-3">Are you sure you want to delete this post?</p>
            <div className="flex justify-end">
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow-md mr-5">
                Delete
              </button>
              <button onClick={hideDeleteConfirmation} className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.any,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img_url: PropTypes.string,
    published: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.string,
    timestamp: PropTypes.string,
  }).isRequired,
};

export default PostCard;
 