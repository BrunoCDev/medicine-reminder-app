import axios from "axios";

//Initial State
const initialState = {
  user: {},
  medicine: [],
  alarm: {},
  rxcuis: "",
  isLoading: false,
  didError: false,
  activeMedicine: {},
  backgroundColors: {
    first: "rgb(33,33,33)",
    second: "rgb(18,18,18)",
    third: "rgb(83,83,83)",
    button: "#1db954",
    card: "#535353",
    textcolor: "white"
  }
};

//Action Types
const RETRIEVE_USER = "RETRIEVE_USER";
const RETRIEVE_MEDICINE = "RETRIEVE_MEDICINE";
const CREATE_MEDICINE = "CREATE_MEDICINE";
const RETRIEVE_RXCUIS = "RETRIEVE_RXCUIS";
const EDIT_MEDICINE = "EDIT_MEDICINE";
const DELETE_MEDICINE = "DELETE_MEDICINE";
const CREATE_COLORS = "CREATE_COLORS";
const GET_COLORS = "GET_COLORS";
const UPDATE_COLORS = "UPDATE_COLORS";

//Action Creators

export function createColors({
  firstColor,
  secondColor,
  thirdColor,
  buttonColor,
  cardColor,
  textColor,
  id
}) {
  return {
    type: CREATE_COLORS,
    payload: axios
      .post("http://localhost:3005/api/colors", {
        firstColor,
        secondColor,
        thirdColor,
        buttonColor,
        cardColor,
        textColor,
        id
      })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function updateColors({
  firstColor,
  secondColor,
  thirdColor,
  buttonColor,
  cardColor,
  textColor,
  id
}) {
  return {
    type: UPDATE_COLORS,
    payload: axios
      .post("http://localhost:3005/api/colors/update", {
        firstColor,
        secondColor,
        thirdColor,
        buttonColor,
        cardColor,
        textColor,
        id
      })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function getColors(id) {
  return {
    type: GET_COLORS,
    payload: axios
      .get(`http://localhost:3005/api/colors/${id}`)
      .then(response => {
        if (response.data.length) {
          return response.data;
        } else {
          return [
            {
              first: "rgb(33,33,33)",
              second: "rgb(18,18,18)",
              third: "rgb(83,83,83)",
              button: "#1db954",
              card: "#535353",
              textcolor: "white"
            }
          ];
        }
      })
      .catch(console.log)
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
  console.log("name", name);
  return {
    type: RETRIEVE_RXCUIS,
    payload: axios
      .get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${name}`)
      .then(res => {
        console.log("response", res);
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

    // CREATE COLORS
    case `${CREATE_COLORS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${CREATE_COLORS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        backgroundColors: action.payload[0]
      });

    case `${CREATE_COLORS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // GET COLORS
    case `${GET_COLORS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_COLORS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        backgroundColors: action.payload[0]
      });

    case `${GET_COLORS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // UPDATE COLORS
    case `${UPDATE_COLORS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${UPDATE_COLORS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        backgroundColors: action.payload[0]
      });

    case `${UPDATE_COLORS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    default:
      return state;
  }
}
