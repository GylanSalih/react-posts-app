export const deletePostById = async (id) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
  };
  
  export const getPosts = async (page = 1, limit = 10) => {
    return await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
      {}
    );
  };
  