import PropTypes from "prop-types";

function PostCard({ post }) {
  return (
    <div className="max-w-sm bg-white border border-gray-400 rounded-lg shadow mb-10">
      <a href="">
        <img className="rounded-t-lg h-52" src="" alt="" />
      </a>
      <div className="p-5">
        <a href="">
          <h5 className="mb-2 text-2xl font-bold">{post.title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <a
          href=""
          className="inline-flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Read more
        </a>
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
