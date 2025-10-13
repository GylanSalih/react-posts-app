export const deletePostById = async (id) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
  };
  
  export const getPosts = async (page = 1, limit = 10, userId = "") => {
    return await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}&_userId=${userId}`,
      {}
    );
  };

  export const getPostById = async (id) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  };

  export const getPostsByUserId = async (userId) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts?_userId=${userId}`);
  };