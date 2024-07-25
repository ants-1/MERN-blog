import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import PostForm from "./components/PostForm";
import EditPostForm from "./components/EditPostForm";

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts" element={<PostForm />} />
          <Route path="/edit/:id" element={<EditPostForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
