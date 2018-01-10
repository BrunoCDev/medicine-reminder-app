import React from "react";

import { createRootNavigator, signedOut } from "./router";

import { Provider } from "react-redux";
import store from "./store";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Layout = createRootNavigator(signedOut);
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
