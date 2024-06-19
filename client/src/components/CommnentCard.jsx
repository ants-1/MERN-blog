import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import EditCommentForm from "./EditCommentForm";

function CommentCard({ comment, post }) {
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const formattedDate = formatDistance(
    new Date(comment.timestamp),
    new Date(),
    {
      addSuffix: true,
    }
  );
  const author =
    comment.author && comment.author.username
      ? comment.author.username
      : "User Deleted";

  const [decodedToken, setDecodedToken] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);

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
  const isAuthor = comment.author && comment.author._id === currentUser;

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${post._id}/comments/${comment._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Comment deleted successfully");
        window.location.reload();
      } else {
        console.error("Error deleting comment");
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

  const toggleEditForm = () => {
    setEditFormVisible((prev) => !prev);
  };

  return (
    <div className="max-w border border-gray-400 px-6 py-4 rounded-lg my-10 shadow-md">
      <div className="flex items-center mb-6">
        <img
          src=""
          alt="Avatar"
          className="w-12 h-12 rounded-full mr-4 bg-black"
        />
        <div>
          <div className="text-lg font-medium">{author}</div>
          <div>{formattedDate}</div>
        </div>
      </div>
      {editFormVisible ? (
        <EditCommentForm
          comment={comment}
          postId={post._id}
          hideEditForm={toggleEditForm}
        />
      ) : (
        <p className="mb-6">{comment.text}</p>
      )}
      {isLoggedIn && (isAdmin || isAuthor) && (
        <div className="flex gap-2 justify-end">
          <button onClick={toggleEditForm}>
            <img src="/edit-icon.png" alt="Edit Icon" className="h-5 w-5" />
          </button>
          <button className="cursor-pointer" onClick={showDeleteConfirmation}>
            <img src="/delete-icon.png" alt="Delete Icon" className="h-5 w-5" />
          </button>
        </div>
      )}
      {isLoggedIn && showConfirmDelete && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="mb-3">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow-md mr-5"
              >
                Delete
              </button>
              <button
                onClick={hideDeleteConfirmation}
                className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
    }),
    timestamp: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
