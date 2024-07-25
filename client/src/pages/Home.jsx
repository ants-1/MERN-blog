import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

function Home({ posts, setPosts }) {
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const searchParams = new URLSearchParams(location.search);
      const searchQuery = searchParams.get("search") || "";

      try {
        const response = await fetch(
          `http://localhost:3000/api/posts?search=${searchQuery}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [location.search, setPosts]);

  return (
    <main className="container mx-auto px-4">
      <div className="mb-16">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 justify-items-center items-center">
        {!posts ? (
          <div className="text-center text-black">No posts found.</div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </main>
  );
}

export default Home;
