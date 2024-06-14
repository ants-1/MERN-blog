import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-10">
      <h1 className="text-4xl font-bold text-center mb-16">{post.title}</h1>
      <div className="flex justify-center">
        <img
          className="bg-gray-200 w-full sm:w-[35rem] h-72 mb-5"
          src={post.url}
          alt={post.title}
        />
      </div>
      <p>
        Author: {post.author.username ? post.author.username : "User Deleted"}
      </p>
      <p>Date Posted: {post.timestamp}</p>
      <div className="mt-10">
        <p>{post.content}</p>
        {comments.map((comment) => (
          <p key={comment.id}>{comment.text}</p>
        ))}
      </div>
    </main>
  );
}

export default Post;
