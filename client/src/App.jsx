import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const posts = [
    {
      id: 1,
      title: "Post 1",
    },
    {
      id: 2,
      title: "Post 2",
    },
    {
      id: 3,
      title: "Post 3",
    },
    {
      id: 4,
      title: "Post 4",
    },
  ];

  return (
    <>
      <Header />
      <Home posts={posts}/>
    </>
  );
}

export default App;
