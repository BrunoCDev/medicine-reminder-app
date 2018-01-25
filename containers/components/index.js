import React from "react";
import { AsyncStorage } from "react-native";

import { createRootNavigator, signedOut } from "./router";
import { Loading } from "./screens/Loading";

import { Provider } from "react-redux";
import store from "./store";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      loading: true
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("user").then(result => {
      this.setState({ signedIn: result, loading: false });
    });
  }

  render() {
    const Layout = createRootNavigator(this.state.signedIn);
    const { loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
