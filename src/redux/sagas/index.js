//now we want this saga to watch a particular type of action...to do so, redux saga has a module called 'takeEvery', so we import it:
import { takeEvery } from "redux-saga/effects";
//we'd also need axios
import axios from "axios";
import { put, call } from "redux-saga/effects";
import { SET_USER_PROFILE } from "../user/user.types";
import { setUserProfile, setUserProfileError } from "../user/user.actions";

/* _-------------TEST SAGA, TO EXPLAIN STUFF (SO THIS FUNCTION IS ACTUALLY NOT PART OF THE DEAL) */
export function* dispatchDummy() {
  /* to dispatch an action from a saga, you use the put effect. Let’s see
that at work.
 */
  yield put({ type: "DUMMY_ACTION" });
}
/* _----------------------------------------------------------------------------------------------- */

//to carryout a network request, we need a to sagas: one that watches for the type of action dispatched and one that does the action itself.
// first create a saga that watches the action dispatched,
export function* watchFetchUserProfile() {
  yield takeEvery("FETCH_USER_PROFILE", fetchUserProfile);
  //the takeEvery accepts two arguements, the type of action and the other type of saga we called worker saga that does the action fetching of the data...
}

//worker saga
export function* fetchUserProfile() {
  try {
    const response = yield call(axios.get, "https://api.github.com/users");
    //now to get the data from the response, All we need to do is dispatch a SET_USER_PROFILE action
    // with a payload containing the values from response.data. and to to this we use the put module from redux-saga... so THE BELOW IS HOW YOU DISPATCH A NETWORK REQUEST ACTION IN REDUX-SAGA...
    yield put(setUserProfile(response.data)); //the setUserProfile action here has not been created...
  } catch (error) {
    yield put(setUserProfileError(error));
  }
}
/* follow up doc for more robust understanding: 
https://redux-saga.js.org/docs/basics/

then checkout tabs: getting started, error handling, more...
*/
