import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const truncatedContent =
    post.content.length > 50
      ? `${post.content.substring(0, 50)}...`
      : post.content;
  const postUrl = `/posts/${post._id}`;

  return (
    <div className="max-w-sm bg-white border border-gray-400 rounded-lg shadow mb-10 h-[25rem]">
      <Link to={postUrl}>
        <img className="rounded-t-lg h-52" src="" alt="" />
      </Link>
      <div className="p-5">
        <Link to={postUrl}>
          <h5 className="mb-2 text-2xl font-bold">{post.title}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">{truncatedContent}</p>
        <Link
          to={postUrl}
          className="inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Read more
        </Link>
      </div>
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
