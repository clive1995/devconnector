import {
  deleteEducationFromState,
  deleteExperienceFromState,
} from "./globalfunction";

const INNITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profile = (state = INNITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_PROFILE":
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case "DELETE_EDUCATION":
      return {
        ...state,
        profile: deleteEducationFromState(state, payload),
        loading: false,
      };
    case "DELETE_EXPERIENCE":
      return {
        ...state,
        profile: deleteExperienceFromState(state, payload),
        loading: false,
      };
    case "GET_PROFILES":
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case "GET_REPOS":
      return {
        ...state,
        loading: false,
        repos: payload,
      };
    default:
      return state;
  }
};

export default profile;
