import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: ""
    };
  }
  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="SIGN UP">
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
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder="Confirm Password..."
            onChangeText={e => this.setState({ password2: e })}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={() => navigation.navigate("SignedIn")}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
        </Card>
      </View>
    );
  }
}
