import React, { Component } from "react";
import axios from "axios";
const ImagePicker = require("react-native-image-picker");

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert,
  Picker,
  DatePickerAndroid,
  TimePickerAndroid
} from "react-native";

import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Footer,
  FooterTab
} from "native-base";

import { Loading } from "./Loading";

import PushNotification from "react-native-push-notification";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styled from "styled-components/native";

import {
  createMedicine,
  retrieveRxcuis,
  addAlarm,
  createMedicineActive,
  loadingTrue,
  loadingFalse
} from "../ducks/user";

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
      rxcuis: "",
      interval: "day",
      startDate: "",
      time: ""
    };

    this.createNewMedicine = this.createNewMedicine.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      image:
        "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png"
    });
    this.props.loadingFalse();
  }

  getImage = () => {
    ImagePicker.showImagePicker({ cameraType: "back" }, response => {
      this.props.loadingTrue();
      let source = response.uri;
      this.setState(
        {
          image: source
            ? source
            : "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png"
        },
        () => this.props.loadingFalse()
      );
    });
  };

  createNewMedicine() {
    const { id } = this.props.user;
    const { image, name, description } = this.state;
    this.props.retrieveRxcuis(name).then(() => {
      if (this.props.rxcuis) {
        this.props
          .createMedicine({
            name,
            image,
            description,
            rxcuis: this.props.rxcuis,
            id
          })
          .then(res => {
            if (res.value) {
              this.props
                .createMedicineActive(
                  name,
                  image,
                  description,
                  this.props.rxcuis,
                  id
                )
                .then(response => {
                  Alert.alert("Medicine", "Medicine was sucessfully added");
                  this.props.navigation.navigate("Home");
                });
            } else {
              this.props.loadingFalse();
              Alert.alert("Error", "Something Went Wrong");
            }
          })
          .catch(console.log);
      } else {
        this.props.loadingFalse();
        Alert.alert("Medicine not found", "Make sure the name is right!");
      }
    });
  }

  render() {
    const { navigation, backgroundColors } = this.props;
    this.props.loading ? <Loading /> : null;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri: this.state.image
                  }}
                />
                <Body>
                  <TextInput
                    placeholder="Medicine Name"
                    onChangeText={e => this.setState({ name: e })}
                  />
                  <TextInput
                    note
                    placeholder="Medicine Description"
                    onChangeText={e => this.setState({ description: e })}
                  />
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <TouchableHighlight
                onPress={this.getImage}
                style={{
                  height: 350,
                  flex: 1
                }}
              >
                <Image
                  source={{
                    uri: !this.state.image
                      ? "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png"
                      : this.state.image
                  }}
                  style={{ height: 350, flex: 1 }}
                />
              </TouchableHighlight>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                this.props.loadingTrue();
                this.createNewMedicine();
              }}
              style={{ backgroundColor: this.props.backgroundColors.button }}
            >
              <Text style={{ color: this.props.backgroundColors.footer_icon }}>
                Save
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  createMedicine,
  retrieveRxcuis,
  addAlarm,
  createMedicineActive,
  loadingTrue,
  loadingFalse
})(Create);
