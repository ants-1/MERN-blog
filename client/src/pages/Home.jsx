import PostCard from "../components/PostCard";
import PropTypes from 'prop-types';

function Home({ posts }) {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-16">
        Welcome to the Blog
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 justify-items-center items-center">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}

Home.propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default Home;