import React, { createContext, useReducer } from "react"; // erzeugt ein Context-Objekt.
import { DUMMY_PRODUCTS } from "../components/shop-udemy/dummy-products.js";



export const PosterContext = createContext({
  posts: [{
    userId: number,
    id: string,
    title: string,
    body: string,
  }],
  addPost: (id) => {},
  deletePost: (id) => {},
  updateTitle: (title) => {},
  updateBody: (body) => {},
});

export const PosterProvider = PosterContext.Provider;


// immer wenn wir eine Action ausführen, wird diese Funktion aufgerufen
// hier befindet sich das Herz des Reducers
function posterReducer(
  state,
  action
) {
  if (action.type === "ADD_POST") {
    const updatedPosts = [...state.posts];

    const existingPostIndex = updatedPosts.findIndex(
      (post) => post.id === action.payload
    );
    const existingPost = updatedPosts[existingPostIndex];

    if (existingPost) {
      const updatedPost = {
        ...existingPost,
      };
      updatedPosts[existingPostIndex] = updatedPost;
    };
        if (!existingPost) {
        updatedPosts.push({
          id: action.payload,
          title: existingPost.title,
          body: existingPost.body,
          userId: existingPost.userId,
        });
      }
    }

    return {
      ...state,
      posts: updatedPosts,
    };
  };

  

  if (action.type === "UPDATE_POST") {
    const updatedPosts = [...state.posts];
      const updatedPostIndex = updatedPosts.findIndex(
        (item) => item.id === action.payload.postId
      );

      const updatedPost = {
        id: string,
        title: string,
        body: string,
        userId: number,
      } = {
      const updatedPost = {
        ...updatedPosts[updatedPostIndex],
        title: updatedPosts[updatedPostIndex]?.title + action.payload.title,
        body: updatedPosts[updatedPostIndex]?.body + action.payload.body,
      };

      if (updatedPost.userId && updatedPost.userId <= 0) {
        updatedPosts.splice(updatedPostIndex, 1);
      } else {
        updatedPosts[updatedPostIndex] = updatedPost;
      }

      return {
        ...state,
        posts: updatedPosts,
      };
    }



if (action.type === "DELETE_POST") {
  const updatedPosts = [...state.posts];

  const existingPostIndex = updatedPosts.findIndex(
    (post) => post.id !== action.payload
  );
  const existingPost = updatedPosts[existingPostIndex];

  if (existingPost) {
    const updatedPost = {
      ...existingPost,
    };
    updatedPosts[existingPostIndex] = updatedPost;
  };
      if (!existingPost) {
      updatedPosts.push({
        id: action.payload,
        title: existingPost.title,
        body: existingPost.body,
        userId: existingPost.userId,
      });
    }
  }

  return {
    ...state,
    posts: updatedPosts,
  };
}

export default function PosterContextProvider({
  children,
}) {
  const [posterState, posterDispatch] = useReducer(
    posterReducer,
    {
      posts: [],
    }
  );

  // eine funktion mit typen die wir an den reducer übergeben
  function handleAddPost(id) {
    posterDispatch({
      type: "ADD_POST",
      payload: id,
    });
  }

  function handleUpdatePost(postId, amount) {
    posterDispatch({
      type: "UPDATE_POST",
      payload: { postId, amount },
    });
  }

  function handleDeletePost(id) {
    posterDispatch({
      type: "DELETE_POST",
      payload: id,
    });
  }

  const ctxValue = {
    posts: posterState.posts,
    addPost: handleAddPost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
  };

  return (
    <PosterContext.Provider value={ctxValue}>{children}</PosterContext.Provider>
  );
}
