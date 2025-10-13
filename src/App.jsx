import React, { useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components import
import Home from './pages/home/Home';
import Posts from './pages/posts/Posts';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AddNewPost from './pages/add-new-post/AddNewPost';
import PostPage from './pages/PostPage/PostPage';

// import von context
import { PosterProvider } from './context/postercontent.jsx';

export default function App() {

  return (
    <PosterProvider>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/AddNewPost" element={<AddNewPost />} />
          {/* <Route path="/editpost/:postId" element={<EditPost />} />
          <Route path="/AllPosts" element={<AllPosts />} /> */}
          <Route path="/Posts/:postId" element={<PostPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </PosterProvider>
  );
}
