import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

export const Loading = () => (
  <Spinner
    visible={true}
    textContent={""}
    color={"#6dff48"}
    textStyle={{ color: "#1b2a39" }}
  />
);
