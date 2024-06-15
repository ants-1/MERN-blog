import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  });

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
