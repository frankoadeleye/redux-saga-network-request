//so the root reducer is what combines all reducers and set all incoming reducers to be values of keys that'll be set in the combine reducer...
import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

export default combineReducers({
  userReducer,
});
//so what we see below is our actual redux store... or you can say multiple reducers are what makes up the redux store. Though above we have only one reducer, and that one reducer has initialState. so our redux store takes in the initialState of the reducer as its own initialState and as actions are fired the values of the store changes because the values of the reducer's state changes...
