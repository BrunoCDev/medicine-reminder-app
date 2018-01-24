import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import { connect } from "react-redux";
import { retrieveMedicine, getUserById } from "../ducks/user";

class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: notification => {
        this.props.navigate("Profile");
      },
      requestPermissions: true
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { retrieveMedicine, getUserById })(
  PushController
);
