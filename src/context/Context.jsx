import React, { createContext, useContext, useEffect, useState, useReducer } from "react";
import { deletePostById, getPosts } from "../api/api";

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


const postsReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_POST":
      // if(action.type === "DELETE_POST") {}
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        // error null stellem
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        // daten hast die du brauchst um es richtig zu verändern -> eingabe, ergeniss von einem fetch
        // action.payload nochmal nachschauen
        posts: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) => post.id === action.payload.id ? action.payload : post),
      };
    case "LOAD_MORE_BUTTON":
      return {
        ...state,
        currentlyLoadedPosts: state.currentlyLoadedPosts + 1,
      };
    default:
      throw new Error("Error in Reducer something went wrong" + action.type);
  }
}



export const PosterProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [addNewPost, setAddNewPost] = useState(false);
  const [currentlyLoadedPosts, setCurrentlyLoadedPosts] = useState(1);

  // state für State & Dispatch
  const [state, dispatch] = useReducer(postsReducer,
    {
      posts: [],
      title,
      postId

    }
  );


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
        const totalPosts = 100;
        // const calculatedLastPage = Math.ceil(totalPosts / limit);
        // setLastPage(calculatedLastPage);
        setLastPage(10);
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
          title,
          body,
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
