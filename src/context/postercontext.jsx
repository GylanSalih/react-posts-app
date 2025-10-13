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

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}&userId=${userId}`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => setError(error));
  }, [page, limit]);
  
  useEffect(() => {
    async function test() {
      const result = await getPosts(page, userId);
      const lastPage = limit;
      setLastPage(lastPage);
      if (!result.ok) {
        throw new Error("Failed to fetch posts");
      }
      const list = await result.json();
      console.log(list);
      setPosts(list);
    }

    test();
  }, [page, limit]);

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


  // fürs filter damit er arbeiten kann
  const sortByUserId = (userId) => {
    setUserId(userId);
  };

  const posterValue = {
    ApoDescriptionShorter,
    newpostcloseopener,
    deletePost,
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
  };

  return (
    <PosterContext.Provider value={posterValue}>
      {children}
    </PosterContext.Provider>
  );
};
