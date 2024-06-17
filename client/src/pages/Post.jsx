import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import ReactLoading from "react-loading";
import CommentCard from "../components/CommnentCard";
import CommentForm from "../components/CommentForm";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetch(
          `http://localhost:3000/api/posts/${id}`
        );
        const commentResponse = await fetch(
          `http://localhost:3000/api/posts/${id}/comments`
        );
        const postData = await postResponse.json();
        const commentData = await commentResponse.json();
        setPost(postData);
        setComment(commentData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!post) {
    const type = "spin";
    const color = "#000000";
    return (
      <div className="flex items-center justify-center h-96">
        <ReactLoading
          type={type}
          color={color}
          height={"60px"}
          width={"60px"}
        />
      </div>
    );
  }
  const formattedDate = formatDistance(post.timestamp, new Date(), {
    addSuffix: true,
  });
  const author =
    post.author && post.author.username ? post.author.username : "User Deleted";

  return (
    <main className="container mx-auto px-10">
      <h1 className="text-4xl font-bold text-center mb-16">{post.title}</h1>
      <div className="flex flex-col items-center">
        <img
          className="bg-gray-200 w-full sm:w-[35rem] h-72 mb-5"
          src={post.url}
          alt={post.title}
        />
        <div className="w-full sm:w-[35rem]">
          <p>Author: {author}</p>
          <p className="mb-5">Posted: {formattedDate}</p>
          <p>{post.content}</p>
          <p className="text-xl font-bold mt-10">Comments</p>
          <div className="my-5">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))
            ) : (
              <p className="mb-10">No comments</p>
            )}
            <CommentForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Post;
