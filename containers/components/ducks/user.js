import axios from "axios";

//Initial State
const initialState = {
  user: {},
  isLoading: false,
  didError: false
};

//Action Types
const RETRIEVE_USER = "RETRIEVE_USER";

//Action Creators
export function retrieveUser(email, password) {
  return {
    type: RETRIEVE_USER,
    payload: axios
      .post("http://localhost:3005/api/auth", { email, password })
      .then(response => response.data)
      .catch(console.log)
  };
}

//Reducer
export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case `${RETRIEVE_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${RETRIEVE_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case `${RETRIEVE_USER}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    default:
      return state;
  }
}
