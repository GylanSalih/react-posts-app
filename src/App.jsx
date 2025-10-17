import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components import
import Home from "./pages/home/Home.jsx";
// import Posts from "./pages/posts/Posts.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import AddNewPost from "./pages/add-new-post/AddNewPost.jsx";
import PostPage from "./pages/PostPage/SinglePostPageView.jsx";
import EditPost from "./pages/edit-post/EditPost.jsx";

// Context Provider
import { PosterProvider } from "./context/Context.jsx";

export default function App() {
  return (
    <PosterProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/posts" element={<Posts />} /> */}
            <Route path="/AddNewPost" element={<AddNewPost />} />
            <Route path="/editpost/:postId" element={<EditPost />} />
            <Route path="/Posts/:postId" element={<PostPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </PosterProvider>
  );
}
