  export const deletePostById = async (id) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
  };


  // const deletePost = async (id) => {
  //   setError(false);
  //   const result = await deletePostById(id);
  
  export const getPosts = async (page = 1, limit = 10, userId = "") => {
    return await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}${userId ? `&userId=${userId}` : ''}`,
      {}
    );
  };

  export const getPostById = async (id) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  };

  export const getPostsByUserId = async (userId) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts?_userId=${userId}`);
  };

  export const updatePost = async (id, title, body, userId = 1) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };
