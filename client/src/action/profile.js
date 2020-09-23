import axios from "axios";
import { setAlert } from "./alert";
import serAuthToken from "../utils/setAuthTokens";
//get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/me");
    dispatch({
      type: "GET_PROFILE",
      payload: response.data.length ? response.data[0] : null,
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (formdata, history, edit = false) => async (
  dispatch
) => {
  if (localStorage.token) {
    serAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("/api/profile", formdata, config);
    dispatch({
      type: "GET_PROFILE",
      paylaod: response.data,
    });
    setAlert(
      edit
        ? "Profile Info Updated Successfully"
        : "Profile Info Saved Successfully",
      "success",
      2000
    );
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
};

//add experience
export const addExperience = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      "/api/profile/experience",
      formdata,
      config
    );
    dispatch({
      type: "UPDATE_PROFILE",
      paylaod: response.data,
    });

    setAlert("Experience added Successfully", "success", 2000);
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
};

//add education
export const addEducation = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      "/api/profile/education",
      formdata,
      config
    );
    dispatch({
      type: "UPDATE_PROFILE",
      paylaod: response.data,
    });

    setAlert("Education added Successfully", "success", 2000);
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
};

export const deleteEducation = (educationId) => async (dispatch) => {
  try {
    const result = await axios.delete("/api/profile/education/" + educationId);
    dispatch(setAlert("Education Deleted Successfully", "success", 2000));
    dispatch({
      type: "DELETE_EDUCATION",
      payload: educationId,
    });
  } catch (error) {
    dispatch(setAlert("Failed to Deleted Education", "danger", 2000));
  }
};

export const deleteExperience = (experienceId) => async (dispatch) => {
  try {
    const result = await axios.delete(
      "/api/profile/experience/" + experienceId
    );
    dispatch(setAlert("Experience Deleted Successfully", "success", 2000));
    dispatch({
      type: "DELETE_EXPERIENCE",
      payload: experienceId,
    });
  } catch (error) {
    dispatch(setAlert("Failed to Deleted Experience", "danger", 2000));
  }
};

export const deleteProfile = (ProfileId) => async (dispatch) => {
  try {
    const result = await axios.delete("/api/profile/");
    dispatch(
      setAlert("Your Account has been Deleted Successfully", "success", 2000)
    );
    dispatch({
      type: "UPDATE_PROFILE",
      payload: null,
    });
  } catch (error) {
    dispatch(setAlert("Failed to Deleted Education", "danger", 2000));
  }
};

export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: "CLEAR_PROFILE" });
  try {
    const response = await axios.get("/api/profile");
    dispatch({
      type: "GET_PROFILES",
      paylaod: response.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed to fetch profile", "danger", 2000));
  }
};

export const getAllProfilesById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/user/" + userId);
    dispatch({
      type: "GET_PROFILES",
      paylaod: response.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed to fetch profile", "danger", 2000));
  }
};

export const getGitHubRepos = (username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get("/api/profile/github/" + username);
    dispatch({
      type: "GET_REPOS",
      paylaod: response.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed to fetch profile", "danger", 2000));
  }
};
