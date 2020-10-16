const INNITIAL_STATE = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const Post = (state = INNITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case "GET_POST":
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case "ADD_POSTS":
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case "POST_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "UPDATE_LIKES":
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload.postId),
      };
    default:
      return state;
  }
};

export default Post;
