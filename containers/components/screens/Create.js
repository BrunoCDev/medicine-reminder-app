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
import { Card } from "react-native-elements";
import styled from "styled-components/native";

import { createMedicine, retrieveRxcuis } from "./../ducks/user";

import { connect } from "react-redux";

const EditButton = styled.TouchableHighlight`
  background-color: #ddba79;
  height: 50;
  align-items: center;
  justify-content: center;
`;

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
          .then(() => navigation.navigate("Home"))
          .catch(console.log);
      } else {
        Alert.alert("Medicine not found", "Make sure the name is right!");
      }
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <ScrollView>
            <Image source={{ uri: this.state.image }} style={{ height: 300 }} />

            <EditButton onPress={this.getImage} style={{ marginTop: 20 }}>
              <Text>Get Image</Text>
            </EditButton>

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
            <EditButton
              style={{
                width: 50,
                flex: 0.4,
                alignSelf: "flex-start",
                marginLeft: 30,
                backgroundColor: "#cdc8b1"
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
            >
              <Text>Cancel</Text>
            </EditButton>

            <EditButton
              style={{
                width: 50,
                flex: 0.4,
                marginLeft: 70,
                alignSelf: "flex-end",
                backgroundColor: "#cdc8b1"
              }}
              onPress={() => {
                this.createNewMedicine();
              }}
            >
              <Text>Save</Text>
            </EditButton>
          </ScrollView>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { createMedicine, retrieveRxcuis })(
  Create
);
