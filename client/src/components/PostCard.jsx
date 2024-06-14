import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="max-w-sm bg-white border border-gray-400 rounded-lg shadow mb-10">
      <Link to="/posts">
        <img className="rounded-t-lg h-52" src="" alt="" />
      </Link>
      <div className="p-5">
        <Link to="/posts">
          <h5 className="mb-2 text-2xl font-bold">{post.title}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <Link
          to="/posts"
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
