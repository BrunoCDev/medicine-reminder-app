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

import PushController from "./../extras/PushController";
import PushNotification from "react-native-push-notification";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styled from "styled-components/native";

import {
  createMedicine,
  retrieveRxcuis,
  addAlarm,
  createMedicineActive
} from "./../ducks/user";

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
    const { image, name, description, interval } = this.state;
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
                  const { startDate, time, interval } = this.state;
                  const medicineId = this.props.activeMedicine.id.toString();
                  let final = new Date(`${startDate}T${time}`);
                  console.log(final);
                  if (startDate && time) {
                    PushNotification.localNotificationSchedule({
                      id: medicineId,
                      title: name,
                      message: description,
                      bigText: { uri: this.state.image },
                      vibrate: true,
                      vibration: 1000,
                      repeatType: interval,
                      date: final
                    });
                    this.props.addAlarm(
                      medicineId,
                      id,
                      interval,
                      final,
                      this.state.startDate,
                      this.state.time
                    );
                    Alert.alert(
                      "Medicine",
                      "Medicine was sucessfully added with an Alarm"
                    );
                    this.props.navigation.navigate("Home");
                  } else {
                    Alert.alert(
                      "Medicine",
                      "Medicine was sucessfully added without an Alarm"
                    );
                    this.props.navigation.navigate("Home");
                  }
                });
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
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri: !this.state.image
                      ? "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png"
                      : this.state.image
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
                  height: 250,
                  width: null,
                  flex: 1
                }}
              >
                <Image
                  source={{
                    uri: !this.state.image
                      ? "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png"
                      : this.state.image
                  }}
                  style={{ height: 150, width: null, flex: 1 }}
                />
              </TouchableHighlight>
            </CardItem>
            <Picker
              selectedValue={this.state.interval}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ interval: itemValue })
              }
            >
              <Picker.Item label="Daily" value="day" />
              <Picker.Item label="Weekly" value="week" />
            </Picker>
            <CardItem>
              <Left />
              <Body>
                <Button
                  style={{
                    backgroundColor: this.props.backgroundColors.button
                  }}
                  onPress={() => {
                    const { action, date } = DatePickerAndroid.open({
                      date: new Date()
                    }).then(r => {
                      let month = parseInt(r.month, 10) + 1;
                      month < 10
                        ? (month = "0" + month.toString())
                        : (month = month.toString());
                      let day = parseInt(r.day, 10);
                      day < 10
                        ? (day = "0" + day.toString())
                        : (day = day.toString());
                      this.setState({
                        startDate: `${r.year}-${month}-${day}`
                      });
                      TimePickerAndroid.open({}).then(r2 => {
                        let hour = parseInt(r2.hour, 10);
                        hour < 10
                          ? (hour = "0" + hour.toString())
                          : (hour = hour.toString());
                        let minutes = parseInt(r2.minute, 10);
                        minutes < 10
                          ? (minutes = "0" + minutes.toString())
                          : (minutes = minutes.toString());
                        this.setState({
                          time: `${hour}:${minutes}:00`
                        });
                      });
                    });
                  }}
                >
                  <Text
                    style={{ color: this.props.backgroundColors.textcolor }}
                  >
                    Set Date
                  </Text>
                </Button>
              </Body>
              <Right>
                <Text>{this.state.startDate}</Text>
                <Text>{this.state.time}</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => this.createNewMedicine()}
              style={{ backgroundColor: this.props.backgroundColors.button }}
            >
              <Text style={{ color: this.props.backgroundColors.textcolor }}>
                Save
              </Text>
            </Button>
          </FooterTab>
        </Footer>
        <PushController />
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  createMedicine,
  retrieveRxcuis,
  addAlarm,
  createMedicineActive
})(Create);
