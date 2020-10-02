import {
  SET_USER_PROFILE,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_ERROR,
} from "./user.types";
const initialState = {
  userDetails: [],
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  //so the initialState of the reducer is updated according to the actions that gets dispatched.
  //for example, case FETCH_USER_BEGIN below says:
  //"IF AN ACTION OF THIS TYPE IS DISPATCHED (and we know this action is set to dispatch the moment the fetchGitHubUser() function is called (in user.actions.js) because it is called in the returned statement even before the axios call), then do the following, modify the initialState by first spreading the state so that we don't modify the part we don't want to modify unintentionally, then we move to setting 'loading' to true, and error remains null.
  //we add things like 'loading' to our app so that we can do some interesting things in our app when we call 'loading' as a prop from our redux state as in App.js. So check App.js to see what we used 'loading;' for.
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        loading: false, //because it's no longer loading...
        userDetails: action.payload, //so the reducer is saying set my key 'userDetails' to have value as the actions payload's key which is userdetails...
        error: null,
      };
    case FETCH_USER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
