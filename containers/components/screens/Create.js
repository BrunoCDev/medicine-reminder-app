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
import AnimatedLinearGradient from "react-native-animated-linear-gradient";

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
    const { navigation, backgroundColors } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#e2e2e2" }}>
        <AnimatedLinearGradient
          customColors={[
            `${backgroundColors.first}`,
            `${backgroundColors.second}`,
            `${backgroundColors.third}`
          ]}
        >
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <Card
              containerStyle={{
                backgroundColor: `${backgroundColors.card}`
              }}
            >
              <Image
                source={{ uri: this.state.image }}
                style={{ height: 300 }}
              />

              <TextInput
                onChangeText={e => this.setState({ name: e })}
                placeholder="Medicine Name"
                placeholderTextColor={`${backgroundColors.textcolor}`}
                style={{
                  marginTop: 20,
                  color: `${backgroundColors.textcolor}`
                }}
              />

              <TextInput
                onChangeText={e => this.setState({ description: e })}
                placeholder="Description"
                placeholderTextColor={`${backgroundColors.textcolor}`}
                style={{
                  marginTop: 20,
                  color: `${backgroundColors.textcolor}`
                }}
              />
              <View style={{ alignItems: "center" }}>
                <Button
                  small
                  title={"Get Image"}
                  buttonStyle={{
                    width: 200,
                    backgroundColor: `${backgroundColors.button}`,
                    marginTop: 20
                  }}
                  textStyle={{
                    fontSize: 15,
                    letterSpacing: 10,
                    color: `${backgroundColors.textcolor}`
                  }}
                  onPress={this.getImage}
                />
                <Button
                  small
                  title={"Cancel"}
                  buttonStyle={{
                    width: 200,
                    backgroundColor: `${backgroundColors.button}`,
                    marginTop: 20,
                    alignItems: "center"
                  }}
                  textStyle={{
                    fontSize: 15,
                    letterSpacing: 10,
                    color: `${backgroundColors.textcolor}`
                  }}
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
                    backgroundColor: `${backgroundColors.button}`,
                    marginTop: 20
                  }}
                  textStyle={{
                    fontSize: 15,
                    letterSpacing: 10,
                    color: `${backgroundColors.textcolor}`
                  }}
                  onPress={() => {
                    this.createNewMedicine();
                  }}
                />
              </View>
            </Card>
          </ScrollView>
        </AnimatedLinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { createMedicine, retrieveRxcuis })(
  Create
);
