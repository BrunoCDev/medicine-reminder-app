import React from "react";
// import { isSignedIn } from "./auth";

import { createRootNavigator, signedOut } from "./router";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  // componentWillMount() {
  //   isSignedIn()
  //     .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
  //     .catch(err => alert("An error occurred"));
  // }

  render() {
    // const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //   return null;
    // }

    const Layout = createRootNavigator(signedOut);
    return <Layout />;
  }
}
