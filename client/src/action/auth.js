import axios from "axios";
import { setAlert } from "./alert";
import serAuthToken from "../utils/setAuthTokens";
//LOAD USER

export const LoadUser = () => async (dispatch) => {
  if (localStorage.token) {
    serAuthToken(localStorage.token);
  }
  try {
    await axios
      .get("/api/auth")
      .then((res) => {
        dispatch({
          type: "USER_LOADED",
          payload: res.data,
        });
        console.log(res);
      })
      .catch((err) => {});
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

//REGISTER
export const AuthRegister = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    name,
    email,
    password,
  };
  await axios
    .post("/api/users", body, config)
    .then((res) => {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
      setAlert("Registration Successfull", "success", 2000);
      dispatch(LoadUser());
    })
    .catch((error) => {
      dispatch({
        type: "REGISTER_FAIL",
      });
      if (error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          dispatch(setAlert(err.msg, "danger", 3000));
        });
      } else {
        error.response.data.error.forEach((err) => {
          dispatch(setAlert(err.msg, "danger", 3000));
        });
      }
    });
};

//LOGIN
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    email,
    password,
  };

  try {
    const response = await axios.post("/api/auth", body, config);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data,
    });
    dispatch(LoadUser());
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);
    dispatch({
      type: "LOGIN_FAIL",
    });
    dispatch(setAlert(errors[0].msg, "danger", 3000));
  }
};

//logout
export const logout = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
  dispatch({
    type: "CLEAR_PROFILE",
  });
};
