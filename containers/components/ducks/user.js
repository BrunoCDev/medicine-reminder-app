import axios from "axios";
import { API_HOST } from "react-native-dotenv";

//Initial State
const initialState = {
  user: {},
  loading: true,
  medicine: [],
  alarm: {},
  rxcuis: "",
  isLoading: false,
  didError: false,
  activeMedicine: {},
  backgroundColors: {
    first: "white",
    second: "white",
    third: "white",
    button: "#338ee1",
    card: "white",
    textcolor: "grey",
    footer_icon: "white"
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
const ADD_ALARM = "ADD_ALARM";
const GET_ALARM = "GET_ALARM";
const DELETE_ALARM = "DELETE_ALARM";
const RESET_MEDICINE = "RESET_MEDICINE";
const ACTIVE_MEDICINE = "ACTIVE_MEDICINE";
const DELETE_COLORS = "DELETE_COLORS";
const GET_USER_BY_ID = "GET_USER_BY_ID";
const CREATE_USER = "CREATE_USER";
const LOADING_FALSE = "LOADING_FALSE";
const LOADING_TRUE = "LOADING_TRUE";
const DELETE_ALL_ALARMS = "DELETE_ALL_ALARMS";

//Action Creators

export function deleteAlarms(id) {
  return {
    type: DELETE_ALL_ALARMS,
    payload: axios.post(`${API_HOST}/api/alarms/delete`, { id }).then(() => {})
  };
}

export function loadingTrue() {
  return {
    type: LOADING_TRUE,
    payload: true
  };
}

export function loadingFalse() {
  return {
    type: LOADING_FALSE,
    payload: false
  };
}

export function createUser(email, password) {
  return {
    type: CREATE_USER,
    payload: axios
      .post(`${API_HOST}/api/create`, { email, password })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function getUserById(id) {
  return {
    type: GET_USER_BY_ID,
    payload: axios
      .post(`${API_HOST}/api/user/get`, { id })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function deleteColors(id) {
  return {
    type: DELETE_COLORS,
    payload: axios
      .post(`${API_HOST}/api/colors/delete`, { id })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function createMedicineActive(name, image, description, rxcuis, id) {
  return {
    type: ACTIVE_MEDICINE,
    payload: axios
      .post(`${API_HOST}/api/active/medicine/create`, {
        name,
        image,
        description,
        rxcuis,
        id
      })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function resetActiveMedicine() {
  return {
    type: RESET_MEDICINE,
    payload: {}
  };
}

export function getAlarm(medicineId, id) {
  return {
    type: GET_ALARM,
    payload: axios
      .post(`${API_HOST}/api/alarm/get`, { medicineId, id })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function deleteAlarm(medicineId, id) {
  return {
    type: DELETE_ALARM,
    payload: axios
      .post(`${API_HOST}/api/alarm/delete`, { medicineId, id })
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

export function addAlarm(
  medicineId,
  id,
  interval,
  final,
  displayDate,
  displayTime
) {
  return {
    type: ADD_ALARM,
    payload: axios
      .post(`${API_HOST}/api/alarm/add`, {
        medicineId,
        id,
        interval,
        final,
        displayDate,
        displayTime
      })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function createColors({
  firstColor,
  secondColor,
  thirdColor,
  buttonColor,
  cardColor,
  textColor,
  footer_icon,
  id
}) {
  return {
    type: CREATE_COLORS,
    payload: axios
      .post(`${API_HOST}/api/colors`, {
        firstColor,
        secondColor,
        thirdColor,
        buttonColor,
        cardColor,
        textColor,
        footer_icon,
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
  footer_icon,
  id
}) {
  return {
    type: UPDATE_COLORS,
    payload: axios
      .post(`${API_HOST}/api/colors/update`, {
        firstColor,
        secondColor,
        thirdColor,
        buttonColor,
        cardColor,
        textColor,
        footer_icon,
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
      .get(`${API_HOST}/api/colors/${id}`)
      .then(response => {
        if (response.data.id) {
          return response.data;
        } else {
          return {
            first: "white",
            second: "white",
            third: "white",
            button: "#338ee1",
            card: "white",
            textcolor: "grey",
            footer_icon: "white"
          };
        }
      })
      .catch(console.log)
  };
}

export function retrieveUser(email, password) {
  return {
    type: RETRIEVE_USER,
    payload: axios
      .post(`${API_HOST}/api/auth/`, { email, password })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function retrieveMedicine(id) {
  return {
    type: RETRIEVE_MEDICINE,
    payload: axios
      .get(`${API_HOST}/api/medicine/${id}`)
      .then(res => res.data)
      .catch(console.log)
  };
}

export function createMedicine({ name, image, description, rxcuis, id }) {
  return {
    type: CREATE_MEDICINE,
    payload: axios
      .post(`${API_HOST}/api/createmedicine`, {
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
      .get(`${API_HOST}/api/edit/${id}`)
      .then(response => response.data)
      .catch(console.log)
  };
}

export function deleteMedicine(id, userId) {
  return {
    type: DELETE_MEDICINE,
    payload: axios
      .delete(`${API_HOST}/api/deletemedicine`, {
        params: { id, userId }
      })
      .then(response => response.data)
      .catch(console.log)
  };
}

//Reducer
export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_FALSE:
      return Object.assign({}, state, {
        loading: action.payload
      });

    case LOADING_TRUE:
      return Object.assign({}, state, {
        loading: action.payload
      });

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

    // DELETE ALL ALARMS
    case `${DELETE_ALL_ALARMS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${DELETE_ALL_ALARMS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        alarm: action.payload
      });

    case `${DELETE_ALL_ALARMS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // CREATE USER
    case `${CREATE_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${CREATE_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case `${CREATE_USER}_REJECTED`:
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
        backgroundColors: action.payload
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

    // ADD ALARM
    case `${ADD_ALARM}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${ADD_ALARM}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        alarm: action.payload[0]
      });

    case `${ADD_ALARM}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // ADD ALARM
    case `${GET_ALARM}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_ALARM}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        alarm: action.payload[0]
      });

    case `${GET_ALARM}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // DELETE ALARM
    case `${DELETE_ALARM}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${DELETE_ALARM}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        alarm: action.payload[0]
      });

    case `${DELETE_ALARM}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // RESET ACTIVE MEDICINE
    case RESET_MEDICINE:
      return Object.assign({}, state, {
        activeMedicine: action.payload
      });

    // CREATE ACTIVE MEDICINE
    case `${ACTIVE_MEDICINE}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${ACTIVE_MEDICINE}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        activeMedicine: action.payload[0]
      });

    case `${ACTIVE_MEDICINE}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // DELETE  COLORS
    case `${DELETE_COLORS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${DELETE_COLORS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        backgroundColors: {
          first: "white",
          second: "white",
          third: "white",
          button: "#338ee1",
          card: "white",
          textcolor: "grey",
          footer_icon: "white"
        }
      });

    case `${DELETE_COLORS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // GET USER BY ID
    case `${GET_USER_BY_ID}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_USER_BY_ID}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case `${GET_USER_BY_ID}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    default:
      return state;
  }
}
