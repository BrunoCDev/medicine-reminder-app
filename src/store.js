// You can import combineReducers
import { createStore, applyMiddleware } from "redux";

import promiseMiddleware from "redux-promise-middleware";

import user from "./ducks/user";

// And use combineReducers({user, etc})
const store = createStore(user, applyMiddleware(promiseMiddleware()));

export default store;
