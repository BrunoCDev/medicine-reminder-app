import React, { Component } from "react";
import { View, Alert, AsyncStorage } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
import { retrieveUser, loadingTrue } from "../ducks/user";

import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    const { navigation, retrieveUser } = this.props;
    const { email, password } = this.state;
    return (
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
            onPress={() =>
              retrieveUser(email, password).then(res => {
                if (this.props.user.id) {
                  this.props.loadingTrue();
                  AsyncStorage.setItem(
                    "user",
                    this.props.user.id.toString()
                  ).then(() => {
                    navigation.navigate("Home");
                  });
                } else {
                  Alert.alert(
                    "Login Not Successful",
                    "Please provide a valid Email and Password"
                  );
                }
              })
            }
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { retrieveUser, loadingTrue })(Login);
