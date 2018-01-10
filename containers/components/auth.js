import React from "react";
import axios from "axios";

export const onSignIn = (email, password) =>
  axios
    .post("http://localhost:3005/api/auth", { email, password })
    .then(res => res.data)
    .catch(console.log);

export const onCreateAccount = (email, password) =>
  axios
    .post("http://localhost:3005/api/user", { email, password })
    .then(res => res.data)
    .catch(console.log);
