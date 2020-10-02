import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/rootReducer";
import logger from "redux-logger";

/* all middleware have more complex checks to ensure they deal with only a
certain type or form of action.
With redux-thunk, remember that the middleware only operated on actions that
were functions! Nothing else.
The same with redux, the same with sagas... too.
 */

//to use redux-saga we import createSagaMiddleware from "redux-saga"
import createSagaMiddleware from "redux-saga";

//again, we have created a saga in sagas folder... the watchFetchUserProfile accept the fetchUserProfile saga which in turn perform a network request and dispatch another action using the special 'put' method by redux-saga, when the request is successful... it is this dispatched action that then carries the data from the response as parameter, and in this action this parameter is set to a key payload when the function is defined.
import { watchFetchUserProfile } from "./redux/sagas";

//we now create our saga...
const sagaMiddleware = createSagaMiddleware();

/*

2.)sagaMiddleware will work on another type of action.
The saga middleware only responds to specific action types yielded by sagas!
Yes, these sagas are just generator functions! that's why index.js in redux/sagas had to be a generator function... (can read more on generator function in ohans book redux part 2).
remember thunk middleware helps convert our function (network http client request with axios), to an object before it reaches the reducer... so thunk is working on the actions in user/user.actions.js and user/user.reducer.js.

3.)logger is another middleware that logs your actions, and this logger middleware must be the last in the chain of middlewares

*/
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

//now we have to register a saga, the sagaMiddleware we created earlier has a run
// method that can be invoked with the saga argument. remember a saga is just a function, but a special function called a generator... generator functions are normally called by iterating on them, but now we can iterate not manually , but by the saga middleware... so we have have to call the run method in the sagaMiddleware and pass in our saga as arguement.
sagaMiddleware.run(watchFetchUserProfile);
