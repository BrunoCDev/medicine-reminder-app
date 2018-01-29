import React, { Component } from "react";
import { View, Alert, AsyncStorage } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
import { retrieveUser, loadingTrue } from "../ducks/user";

import { Loading } from "./Loading";

import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      user: false
    };
  }
  render() {
    const { navigation, retrieveUser } = this.props;
    const { email, password } = this.state;
    return this.state.loading ? (
      <Loading />
    ) : (
      <View style={{ paddingVertical: 20 }}>
        <Card title="SIGN IN">
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Email address..."
            onChangeText={e => this.setState({ email: e })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Password..."
            onChangeText={e => this.setState({ password: e })}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => {
              this.setState({ loading: true });
              retrieveUser(email, password).then(() => {
                console.log("props:", this.props.user);
                if (this.props.user.id) {
                  console.log("true");
                  this.setState({ user: true });
                  AsyncStorage.setItem(
                    "user",
                    this.props.user.id.toString()
                  ).then(() => {
                    this.setState({ loading: false });
                    navigation.navigate("Home");
                  });
                } else if (!this.props.user.id) {
                  this.setState({ loading: false });
                  Alert.alert(
                    "Login Not Successful",
                    "Please provide a valid Email and Password"
                  );
                }
              });
              this.setState({ loading: false });
            }}
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { retrieveUser, loadingTrue })(Login);
