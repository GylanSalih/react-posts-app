import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import AllPosts from './pages/blog/AllPosts';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AddNewPost from './pages/add-new-post/AddNewPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllPosts" element={<AllPosts />} />
          <Route path="/AddNewPost" element={<AddNewPost />} />
          <Route path="*" element={<AddNewPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
