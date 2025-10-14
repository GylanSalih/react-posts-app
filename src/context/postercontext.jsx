import React, { createContext, useContext, useEffect, useState } from "react";
import { deletePostById, getPosts } from "../api/api";

const PosterContext = createContext(null);

// --------------- Context -----------------------
export const usePoster = () => {
  const context = useContext(PosterContext);
  if (context === null) {
    throw new Error("usePoster must be used within a PosterProvider");
  }
  return context;
};

export const PosterProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [addNewPost, setAddNewPost] = useState(false);
  const [currentlyLoadedPosts, setCurrentlyLoadedPosts] = useState(1);


  // for search
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await getPosts(page, limit, userId);
        if (!result.ok) {
          throw new Error("Failed to fetch posts");
        }
        const list = await result.json();
        console.log(list);
        setPosts(list);
        // Berechne lastPage basierend auf der Gesamtanzahl (100 Posts bei JSONPlaceholder)
        const totalPosts = 100;
        const calculatedLastPage = Math.ceil(totalPosts / limit);
        setLastPage(calculatedLastPage);
        setCurrentlyLoadedPosts(list.length);
      } catch (err) {
        setError(err);
        console.error("Error fetching posts:", err);
      }
    }

    fetchPosts();
  }, [page, limit, userId, searchTerm]);

  // ApoDescriptionShorter is a function that shortens the description of the post to 100 characters
  const ApoDescriptionShorter = (description) => {
    return description.slice(0, 100) + "...";
  };

  const goNextPage = () => {
    if (page >= lastPage) return;
    setPage(page + 1);
  };

  const goLastPage = () => {
    if (page >= lastPage) return;
    setPage(lastPage);
  };

  const goFirstPage = () => {
    if (page <= 1) return;
    setPage(1);
  };

  const goPreviousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const deletePost = async (id) => {
    setError(false);
    const result = await deletePostById(id);

    console.log(result);
    if (!result.ok) {
      setError(true);
      console.log("deletePost error");
      return;
    }

    const filtered = posts.filter((post) => post.id !== id);
    setPosts(filtered);
    console.log(filtered);
  };

  const newpostcloseopener = () => {
    setAddNewPost(!addNewPost);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const loadMoreButton = () => {
    setLimit(limit + 10);
    console.log(limit);
  }
  




  // geiilll
  useEffect(() => {
    let filtered = posts;
    if (searchTerm) {
      filtered = filtered.filter((post) => post.title.includes(searchTerm));
    }
    setFilteredPosts(filtered);
    console.log(filtered);
  }, [searchTerm, posts]);

  const addPost = async (title, body, userId = 1) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to add post");
      }
      
      const newPost = await response.json();
      console.log("Post added:", newPost);
      
      // Füge den neuen Post zur Liste hinzu
      setPosts([newPost, ...posts]);
      setAddNewPost(false); // Schließe das Formular
      
      return newPost;
    } catch (err) {
      setError(err);
      console.error("Error adding post:", err);
      throw err;
    }
  };

  const updatePostInContext = (postId, title, body) => {
    const updatedPosts = posts.map(post => 
      post.id === parseInt(postId) ? { ...post, title, body } : post
    );
    setPosts(updatedPosts);
  };

  // fürs filter damit er arbeiten kann
  const sortByUserId = (userId) => {
    setUserId(userId);
  };

  const posterValue = {
    ApoDescriptionShorter,
    newpostcloseopener,
    deletePost,
    addPost,
    updatePostInContext,
    sortByUserId,
    goNextPage,
    goLastPage,
    goFirstPage,
    goPreviousPage,
    addNewPost,
    setAddNewPost,
    posts,
    setPosts,
    userId,
    setUserId,
    page,
    setPage,
    error,
    setError,
    lastPage,
    limit,
    setLimit,
    searchTerm,
    setSearchTerm,
    filteredPosts,
    setFilteredPosts,
    handleSearch,
    loadMoreButton,
    currentlyLoadedPosts,
  };

  return (
    <PosterContext.Provider value={posterValue}>
      {children}
    </PosterContext.Provider>
  );
};
