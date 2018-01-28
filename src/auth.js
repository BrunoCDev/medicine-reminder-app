import React from "react";
import axios from "axios";
import { API_HOST } from "react-native-dotenv";

export const onSignIn = (email, password) =>
  axios
    .post(`${API_HOST}/api/auth`, { email, password })
    .then(res => res.data)
    .catch(console.log);

export const onCreateAccount = ({ email, password }) => {
  axios
    .post(`${API_HOST}/create`, { email, password })
    .then(res => res.data)
    .catch(console.log);
};
