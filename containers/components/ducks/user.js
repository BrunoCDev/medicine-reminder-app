import axios from "axios";

//Initial State
const initialState = {
  user: {},
  medicine: [],
  rxcuis: "",
  isLoading: false,
  didError: false,
  activeMedicine: {},
  backgroundColors: {
    firstColor: "rgb(33,33,33)",
    secondColor: "rgb(18,18,18)",
    thirdColor: "rgb(83,83,83)",
    buttonColor: "#1db954",
    cardColor: "#535353",
    textColor: "white"
  }
};

//Action Types
const RETRIEVE_USER = "RETRIEVE_USER";
const RETRIEVE_MEDICINE = "RETRIEVE_MEDICINE";
const CREATE_MEDICINE = "CREATE_MEDICINE";
const RETRIEVE_RXCUIS = "RETRIEVE_RXCUIS";
const EDIT_MEDICINE = "EDIT_MEDICINE";
const DELETE_MEDICINE = "DELETE_MEDICINE";
const BACKGROUND_COLORS = "BACKGROUND_COLORS";

//Action Creators

export function backgroundColors(obj) {
  return {
    type: BACKGROUND_COLORS,
    payload: obj
  };
}

export function retrieveUser(email, password) {
  return {
    type: RETRIEVE_USER,
    payload: axios
      .post("http://localhost:3005/api/auth/", { email, password })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function retrieveMedicine(id) {
  return {
    type: RETRIEVE_MEDICINE,
    payload: axios
      .get(`http://localhost:3005/api/medicine/${id}`)
      .then(res => res.data)
      .catch(console.log)
  };
}

export function createMedicine({ name, image, description, rxcuis, id }) {
  return {
    type: CREATE_MEDICINE,
    payload: axios
      .post("http://localhost:3005/api/createmedicine", {
        name,
        image,
        description,
        rxcuis,
        id
      })
      .then(res => res.data)
      .catch(console.log)
  };
}

export function retrieveRxcuis(name) {
  return {
    type: RETRIEVE_RXCUIS,
    payload: axios
      .get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${name}`)
      .then(res => {
        const rxcuis = res.data.idGroup.rxnormId[0];
        if (rxcuis) {
          return rxcuis;
        } else {
          return "";
        }
      })
      .catch(console.log)
  };
}

export function editMedicine(id) {
  return {
    type: EDIT_MEDICINE,
    payload: axios
      .get(`http://localhost:3005/api/edit/${id}`)
      .then(response => response.data)
      .catch(console.log)
  };
}

export function deleteMedicine(id, userId) {
  console.log(id, userId);
  return {
    type: DELETE_MEDICINE,
    payload: axios
      .delete(`http://localhost:3005/api/deletemedicine`, {
        params: { id, userId }
      })
      .then(response => response.data)
      .catch(console.log)
  };
}

//Reducer
export default function user(state = initialState, action = {}) {
  switch (action.type) {
    // USER
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

    // MEDICINE
    case `${RETRIEVE_MEDICINE}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${RETRIEVE_MEDICINE}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        medicine: action.payload
      });

    case `${RETRIEVE_MEDICINE}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // CREATE MEDICINE
    case `${CREATE_MEDICINE}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${CREATE_MEDICINE}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        medicine: action.payload
      });

    case `${CREATE_MEDICINE}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // RETRIEVE RXCUIS
    case `${RETRIEVE_RXCUIS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${RETRIEVE_RXCUIS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        rxcuis: action.payload
      });

    case `${RETRIEVE_RXCUIS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // EDIT MEDICINE
    case `${EDIT_MEDICINE}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${EDIT_MEDICINE}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        activeMedicine: action.payload
      });

    case `${EDIT_MEDICINE}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // DELETE MEDICINE
    case `${DELETE_MEDICINE}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${DELETE_MEDICINE}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        medicine: action.payload
      });

    case `${DELETE_MEDICINE}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // BACKGROUND COLORS
    case BACKGROUND_COLORS:
      return Object.assign({}, state, {
        isLoading: false,
        backgroundColors: action.payload
      });

    default:
      return state;
  }
}
