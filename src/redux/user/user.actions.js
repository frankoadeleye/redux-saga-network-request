import {
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_ERROR,
  SET_USER_PROFILE,
} from "./user.types";

//we create an action with the same as the worker generator function (or simply call them sagas) in sagas/index.js
export const fetchUserProfile = () => ({
  type: FETCH_USER_PROFILE,
});

/* setUserProfile is an action creator that takes in the data received from making
the network request and returns an action with the data set as its payload. */
export const setUserProfile = (data) => ({
  type: SET_USER_PROFILE,
  payload: data,
});

//we want to another action that helps us modify the state when the reducer checks for the type FETCH_USER_PROFILE_ERROR
export const setUserProfileError = (error) => ({
  type: FETCH_USER_PROFILE_ERROR,
  payload: { error },
});
