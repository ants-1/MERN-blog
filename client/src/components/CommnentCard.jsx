import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

function CommentCard({ comment }) {
  const formattedDate = formatDistance(comment.timestamp, new Date(), {
    addSuffix: true,
  });

  const author =
  comment.author && comment.author.username ? comment.author.username : "User Deleted";

  return (
    <div className="max-w border border-gray-400 px-6 py-4 rounded-lg my-10 ">
      <div className="flex items-center mb-6">
        <img src="" alt="Avater" className="w-12 h-12 rounded-full mr-4 bg-black" />
        <div>
          <div className="text-lg font-medium">{author}</div>
          <div>{formattedDate}</div>
        </div>
      </div>
      <p className="mb-6">{comment.text}</p>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string,
    timestamp: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
