import React from "react";

function reducer(state, action) {
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
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
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
