import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { deletePostById, getPosts } from "../api/api";
import postReducer from "./Reducer";

const PosterContext = createContext(null);

// --------------- Context -----------------------
export const usePoster = () => {
  const context = useContext(PosterContext);
  if (!context) {
    // or if (context === null) {}
    throw new Error("usePoster must be used within a PosterProvider");
  }
  return context;
};

const INITIAL_STATE = {
  posts: [],
  userId: "",
  page: 1,
  error: null,
  lastPage: 10,
  limit: 10,
  openUi: false,
  currentlyLoadedPosts: 1,
  filteredPosts: [],
  searchTerm: "",
  selectedUserId: "all",
  log: "",
};

export const PosterProvider = ({ children }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  // state für State & Dispatch
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await getPosts(state.page, state.limit, state.userId);
        if (!result.ok) {
          throw new Error("Failed to fetch posts");
        }
        const list = await result.json();
        dispatch({ type: "POST_FILLER", payload: list }); // list an setposts dispatch weitergeben
        // setCurrentlyLoadedPosts(list.length);
      } catch (err) {
        setError(err);
        console.error("Error fetching posts:", err);
      }
    }

    fetchPosts();
  }, [state.page, state.limit, state.userId, state.searchTerm]);

  // ApoDescriptionShorter is a function that shortens the description of the post to 100 characters
  const ApoDescriptionShorter = (description) => {
    return description.slice(0, 100) + "...";
  };

  // ----------------- PAGINATION START ----------------------- //
  const goNextPage = () => {
    if (state.page >= state.lastPage) return;
    dispatch({ type: "SET_PAGE", payload: state.page + 1 });
  };

  const goLastPage = () => {
    if (state.page >= state.lastPage) return;
    dispatch({ type: "SET_PAGE", payload: state.lastPage });
  };

  const goFirstPage = () => {
    if (state.page <= 1) return;
    dispatch({ type: "SET_PAGE", payload: 1 });
  };

  const goPreviousPage = () => {
    if (state.page <= 1) return;
    dispatch({ type: "SET_PAGE", payload: state.page - 1 });
  };

  const loadMoreButton = () => {
    dispatch({ type: "SET_LIMIT", payload: state.limit + 10 });
  };

  const setLimit = (newLimit) => {
    dispatch({ type: "SET_LIMIT", payload: newLimit });
  };

  const setPosts = (newPosts) => {
    dispatch({ type: "POST_FILLER", payload: newPosts });
  };

  const setUserId = (newUserId) => {
    dispatch({ type: "SET_USER_ID", payload: newUserId });
  };

  const setPage = (newPage) => {
    dispatch({ type: "SET_PAGE", payload: newPage });
  };

  const setError = (newError) => {
    dispatch({ type: "FETCH_FAILURE", payload: newError });
  };

  // ----------------- PAGINATION END ----------------------- //

  const newpostcloseopener = () => {
    dispatch({
      type: "ADD_NEW_POST_CLOSER_OPENER",
      payload: !state.openUi,
    });
  };

  const deletePost = async (id) => {
    const result = await deletePostById(id);

    console.log(result);
    if (!result.ok) {
      setError(true);
      console.log("deletePost error");
      return;
    }

    dispatch({ type: "DELETE_POST", payload: { id } });
    console.log("Post deleted with dispatch");
  };

  const addPost = async (title, body, userId = 1) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title,
            body,
            userId: userId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add post");
      }

      const newPost = await response.json();
      console.log("Post added:", newPost);

      // Füge den neuen Post zur Liste hinzu
      dispatch({ type: "ADD_POST", payload: newPost }); // new post weitergeben an add posts dispatch -> später namen besser machen (Matz)

      return newPost;
    } catch (err) {
      setError(err);
      console.error("Error adding post:", err);
      throw err;
    }
  };

  const updatePostInContext = (postId, title, body) => {
    dispatch({
      type: "UPDATE_POST",
      payload: { id: parseInt(postId), title, body },
    });
  };

  // --------------- Sort/Filter Functions -----------------------

  // fürs filter damit er arbeiten kann
  const sortByUserId = (userId) => {
    dispatch({ type: "SET_USER_ID", payload: userId });
  };

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  // handlesearch entscheidet bei onChange auf e.target.value und
  // filter nach dem was du gesucht hast
  // geiilll
  useEffect(() => {
    let filtered = state.posts;
    if (state.searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.includes(state.searchTerm)
      );
    }
    setFilteredPosts(filtered);
  }, [state.searchTerm, state.posts]);

  const posterValue = {
    posts: state.posts,
    userId: state.userId,
    page: state.page,
    error: state.error,
    lastPage: state.lastPage,
    limit: state.limit,
    openUi: state.openUi,
    searchTerm: state.searchTerm,
    filteredPosts: state.filteredPosts,
    isLoading: state.isLoading,
    ApoDescriptionShorter,
    newpostcloseopener,
    deletePost,
    addPost,
    updatePostInContext,
    goNextPage,
    goPreviousPage,
    goFirstPage,
    goLastPage,
    sortByUserId,
    clearUserId: state.userId,
    setPosts,
    setUserId,
    setPage,
    setError,
    setLimit,
    filteredPosts,
    setFilteredPosts,
    handleSearch,
    loadMoreButton,
  };

  return (
    <PosterContext.Provider value={posterValue}>
      {children}
    </PosterContext.Provider>
  );
};
