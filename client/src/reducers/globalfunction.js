export const removeDublicateAlerts = (state, newState) => {
  console.log(state);
  console.log(newState);
  if (
    state !== null &&
    state.length > 0 &&
    state.map(
      (prevState) =>
        prevState.alertType === newState.alertType && newState.disableDublicate
    )
  ) {
    return [...state];
  } else {
    return [...state, newState];
  }
};

export const deleteEducationFromState = (state, deleteId) => {
  let temp = [];
  for (let i = 0; i < state.profile.education.length; i++) {
    if (state.profile.education[i]._id != deleteId) {
      temp.push(state.profile.education[i]);
    }
  }
  state.profile.education = temp;
  return state.profile;
};

export const deleteExperienceFromState = (state, deleteId) => {
  let temp = [];
  for (let i = 0; i < state.profile.experience.length; i++) {
    if (state.profile.experience[i]._id != deleteId) {
      temp.push(state.profile.experience[i]);
    }
  }
  state.profile.experience = temp;
  return state.profile;
};
