import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    const { navigation } = this.props;
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
            onPress={() => navigation.navigate("SignedIn")}
          />
        </Card>
      </View>
    );
  }
}
