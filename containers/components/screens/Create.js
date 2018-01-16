import React, { Component } from "react";
import axios from "axios";
const ImagePicker = require("react-native-image-picker");

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert
} from "react-native";
import { Card, Button } from "react-native-elements";
import styled from "styled-components/native";

import { createMedicine, retrieveRxcuis } from "./../ducks/user";

import { connect } from "react-redux";
import Menu from "./../extras/Menu";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:
        "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png",
      name: "",
      description: "",
      rxcuis: ""
    };

    this.createNewMedicine = this.createNewMedicine.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  getImage = () => {
    ImagePicker.showImagePicker({ cameraType: "back" }, response => {
      let source = response.uri;
      this.setState(
        {
          image: source
        },
        () => {
          return true;
        }
      );
    });
  };

  createNewMedicine() {
    const { id } = this.props.user;
    const { image, name, description } = this.state;

    this.props.retrieveRxcuis(name).then(() => {
      if (this.props.rxcuis.length) {
        this.props
          .createMedicine({
            name,
            image,
            description,
            rxcuis: this.props.rxcuis,
            id
          })
          .then(res => {
            console.log(res);
            if (res.value.length) {
              return this.props.navigation.navigate("Home");
            } else {
              Alert.alert("Error", "Something Went Wrong");
            }
          })
          .catch(console.log);
      } else {
        Alert.alert("Medicine not found", "Make sure the name is right!");
      }
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#e2e2e2" }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          <Card>
            <Image source={{ uri: this.state.image }} style={{ height: 300 }} />

            <TextInput
              onChangeText={e => this.setState({ name: e })}
              placeholder="Name"
              style={{ marginTop: 20 }}
            />

            <TextInput
              onChangeText={e => this.setState({ description: e })}
              placeholder="Description"
              style={{ marginTop: 20 }}
            />
            <View style={{ alignItems: "center" }}>
              <Button
                small
                title={"Get Image"}
                buttonStyle={{
                  width: 200,
                  backgroundColor: "#a7a7a7",
                  marginTop: 20
                }}
                textStyle={{ fontSize: 15, letterSpacing: 10 }}
                onPress={this.getImage}
              />
              <Button
                small
                title={"Cancel"}
                buttonStyle={{
                  width: 200,
                  backgroundColor: "#a7a7a7",
                  marginTop: 20,
                  alignItems: "center"
                }}
                textStyle={{ fontSize: 15, letterSpacing: 10 }}
                onPress={() => {
                  this.setState({
                    image:
                      "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png",
                    name: "",
                    description: "",
                    rxcius: ""
                  });
                  navigation.navigate("Home");
                }}
              />

              <Button
                small
                title={"Save"}
                buttonStyle={{
                  width: 200,
                  backgroundColor: "#a7a7a7",
                  marginTop: 20
                }}
                textStyle={{ fontSize: 15, letterSpacing: 10 }}
                onPress={() => {
                  this.createNewMedicine();
                }}
              />
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { createMedicine, retrieveRxcuis })(
  Create
);
