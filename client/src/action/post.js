import axios from "axios";
import { setAlert } from "./alert";

//get Posts
export const GetPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");
    dispatch({
      type: "GET_POSTS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Like
export const AddLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put("/api/post/like/" + postId);
    dispatch({
      type: "UPDATE_LIKES",
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    if (err.hasOwnProperty("response")) {
      dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//remove Like
export const RemoveLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put("/api/post/unlike/" + postId);
    dispatch({
      type: "UPDATE_LIKES",
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    if (err.hasOwnProperty("response")) {
      dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//DeletePost
export const DeletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/post/" + postId);
    dispatch({
      type: "DELETE_POST",
      payload: { postId },
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    if (err.hasOwnProperty("response")) {
      dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Add Post
export const AddPosts = (formdata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/post", formdata, config);
    dispatch({
      type: "ADD_POSTS",
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    if (err.hasOwnProperty("response")) {
      dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//get Post
export const GetPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get("/api/post/" + postId);
    dispatch({
      type: "GET_POST",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
