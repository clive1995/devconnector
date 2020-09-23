import uuid from "uuid";
export const setAlert = (
  msg,
  alertType,
  timeout = 5000,
  disableDublicate = true
) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: "SET_ALERT",
    payload: { msg, alertType, id, disableDublicate },
  });

  setTimeout(
    () =>
      dispatch({
        type: "REMOVE_ALERT",
        payload: id,
      }),
    timeout
  );
};
