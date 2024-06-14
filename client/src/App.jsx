import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";

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
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/posts" element={<Post />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
