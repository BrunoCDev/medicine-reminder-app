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
      interval: "",
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
                  const { startDate, time } = this.state;
                  const medicineId = this.props.activeMedicine.id.toString();
                  let final = new Date(`${startDate}${time}`);
                  if (startDate && time) {
                    PushNotification.localNotificationSchedule({
                      id: medicineId,
                      title: name,
                      message: description,
                      vibrate: true,
                      vibration: 1000,
                      repeatType: interval,
                      date: final
                    });
                    this.props.addAlarm(medicineId, id, interval, final);
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
                  flex: 1,
                  color: "transparent"
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
              <Picker.Item label="Every Minute" value="minute" />
              <Picker.Item label="Weekly" value="week" />
            </Picker>
            <CardItem>
              <Left />
              <Body>
                <Button
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
                        startDate: `${r.year}-${month}-${day}T`
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
                  <Text>Set Date</Text>
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
            <Button onPress={() => this.createNewMedicine()}>
              <Text>Save</Text>
            </Button>
          </FooterTab>
        </Footer>
        <PushController />
      </Container>
    );
  }
}
{
  /* <View style={{ flex: 1, backgroundColor: "#e2e2e2" }}>
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
      </View> */
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  createMedicine,
  retrieveRxcuis,
  addAlarm,
  createMedicineActive
})(Create);
