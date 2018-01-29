import React, { Component } from "react";
import {
  View,
  ScrollView,
  Picker,
  AppState,
  DatePickerAndroid,
  TimePickerAndroid,
  Alert
} from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import PushNotification from "react-native-push-notification";
import AnimatedLinearGradient, {
  presetColors
} from "react-native-animated-linear-gradient";

import {
  getAlarm,
  deleteAlarm,
  deleteMedicine,
  addAlarm,
  loadingTrue,
  loadingFalse,
  retrieveMedicine
} from "../ducks/user";

import { Loading } from "./Loading";

import moment from "moment";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
      alarm: false,
      startDate: "",
      time: "",
      loading: true
    };
  }

  componentDidMount() {
    this.setState({ alarm: false, loading: true });
    this.props
      .getAlarm(this.props.activeMedicine.id, this.props.user.id)
      .then(() => {
        this.setState({ loading: false });
      });
  }

  createNewAlarm() {
    const { id } = this.props.user;
    const { description, name } = this.props.activeMedicine;
    const { interval } = this.state;
    const medicineId = this.props.activeMedicine.id.toString();
    let final = new Date(`${this.state.startDate}T${this.state.time}-06:00`);
    PushNotification.configure({
      onNotification: notification => {
        this.setState({ loading: true });
        this.props.retrieveMedicine(this.props.activeMedicine.id).then(() => {
          this.setState({ loading: false });
          this.props.navigation.navigate("Profile");
        });
      },
      requestPermissions: true
    });
    PushNotification.localNotificationSchedule({
      id: medicineId,
      title: name,
      message: description,
      vibrate: true,
      vibration: 1000,
      date: final
    });
    this.props
      .addAlarm(
        medicineId,
        id,
        interval,
        `${this.state.startDate} ${this.state.time}`,
        this.state.displayDate,
        this.state.displayTime
      )
      .then(() => {
        this.setState({ loading: false });
        Alert.alert("Alarm", "Alarm was successfully added");
      });
  }

  render() {
    const { navigation, activeMedicine, backgroundColors } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading ? (
          <Loading />
        ) : (
          <View
            style={{ flex: 1, paddingVertical: 10, backgroundColor: "#e2e2e2" }}
          >
            <AnimatedLinearGradient
              customColors={[
                `${backgroundColors.first}`,
                `${backgroundColors.second}`,
                `${backgroundColors.third}`
              ]}
              speed={5000}
            />
            <Card
              containerStyle={{
                backgroundColor: `${backgroundColors.card}`
              }}
              titleStyle={{
                fontSize: 30,
                color: `${backgroundColors.textcolor}`
              }}
              title={activeMedicine.name}
              image={{ uri: activeMedicine.image }}
              imageStyle={{ height: 230 }}
              editable={true}
            >
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 18,
                  textAlign: "center",
                  color: `${backgroundColors.textcolor}`
                }}
              >
                {activeMedicine.description}
              </Text>
              {this.props.alarm ? (
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: `${backgroundColors.textcolor}`
                    }}
                  >
                    Start Date: {this.props.alarm.display_date} Hour:{" "}
                    {this.props.alarm.display_time}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                      color: `${backgroundColors.textcolor}`
                    }}
                  >
                    {this.props.alarm.interval === "day"
                      ? `Interval: Daily`
                      : this.props.alarm.interval === "week"
                        ? `Interval: Weekly`
                        : `Interval: Only Once`}
                  </Text>
                  <Button
                    color={`${backgroundColors.footer_icon}`}
                    backgroundColor={`${backgroundColors.button}`}
                    buttonStyle={{ marginBottom: 10, marginTop: 10 }}
                    title="Stop Alarm"
                    onPress={() => {
                      Alert.alert(
                        "Alarm",
                        "Are you sure you want to remove this Alarm?",
                        [
                          {
                            text: "Cancel"
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              this.setState({ loading: true });
                              PushNotification.cancelLocalNotifications({
                                id: this.props.activeMedicine.id.toString()
                              });
                              this.props
                                .deleteAlarm(
                                  this.props.activeMedicine.id,
                                  this.props.user.id
                                )
                                .then(() => {
                                  this.setState({
                                    startDate: false,
                                    time: false,
                                    loading: false
                                  });
                                  Alert.alert(
                                    "Alarm",
                                    "Alarm was successfully removed"
                                  );
                                });
                            }
                          }
                        ]
                      );
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Picker
                    style={{
                      color: `${backgroundColors.textcolor}`,
                      marginBottom: 10
                    }}
                    selectedValue={this.state.interval}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ interval: itemValue })
                    }
                  >
                    <Picker.Item label="Select an Interval" value={false} />
                    <Picker.Item label="Only Once" value={false} />
                    <Picker.Item label="Daily" value="day" />
                    <Picker.Item label="Weekly" value="week" />
                  </Picker>
                  <View
                    style={{
                      alignItems: "flex-start",
                      flexDirection: "row"
                    }}
                  >
                    <Button
                      color={`${backgroundColors.footer_icon}`}
                      backgroundColor={`${backgroundColors.button}`}
                      title="Set Date"
                      buttonStyle={{ marginBottom: 15, width: 125 }}
                      onPress={() => {
                        const { action, date } = DatePickerAndroid.open({
                          date: new Date()
                        }).then(r => {
                          if (
                            r.year.length !== null &&
                            r.month.length !== null &&
                            r.day.length !== null
                          ) {
                            let month = parseInt(r.month, 10) + 1;
                            month < 10
                              ? (month = "0" + month.toString())
                              : (month = month.toString());
                            let day = parseInt(r.day, 10);
                            day < 10
                              ? (day = "0" + day.toString())
                              : (day = day.toString());
                            this.setState({
                              displayDate: `${r.year}-${month}-${day}`,
                              startDate: `${r.year}-${month}-${day}`
                            });

                            TimePickerAndroid.open({}).then(r2 => {
                              if (
                                r2.hour.length !== null &&
                                r2.minute.length !== null
                              ) {
                                let hour = parseInt(r2.hour, 10);
                                hour < 10
                                  ? (hour = "0" + hour.toString())
                                  : (hour = hour.toString());
                                let minutes = parseInt(r2.minute, 10);
                                minutes < 10
                                  ? (minutes = "0" + minutes.toString())
                                  : (minutes = minutes.toString());
                                this.setState({
                                  displayTime: `${hour}:${minutes}`,
                                  time: `${hour}:${minutes}:00`
                                });
                                Alert.alert(
                                  "Alarm Date",
                                  `You selected ${this.state.startDate}   ${
                                    this.state.time
                                  } as the starting Date, are you sure this is correct?`,
                                  [
                                    {
                                      text: "Cancel",
                                      onPress: () => {
                                        this.setState({
                                          startDate: "",
                                          time: ""
                                        });
                                      }
                                    },
                                    {
                                      text: "Confirm"
                                    }
                                  ]
                                );
                              }
                            });
                          }
                        });
                      }}
                    />
                    <Button
                      color={`${backgroundColors.footer_icon}`}
                      backgroundColor={`${backgroundColors.button}`}
                      buttonStyle={{ marginBottom: 10, width: 125 }}
                      title="Add Alarm"
                      onPress={() => {
                        this.state.startDate && this.state.time
                          ? Alert.alert(
                              "Alarm",
                              `Are you sure you want to add an Alarm for ${
                                this.state.startDate
                              }  ${this.state.time}?`,
                              [
                                { text: "Cancel" },
                                {
                                  text: "Confirm",
                                  onPress: () => {
                                    this.setState({ loading: true });
                                    this.createNewAlarm();
                                  }
                                }
                              ]
                            )
                          : Alert.alert(
                              "Alarm",
                              "Please select a Date before Adding an Alarm!"
                            );
                      }}
                    />
                  </View>
                </View>
              )}
              <Button
                small
                color={`${backgroundColors.footer_icon}`}
                backgroundColor={`${backgroundColors.button}`}
                title={"Remove Medicine"}
                textStyle={{
                  fontSize: 15,
                  letterSpacing: 10
                }}
                onPress={() => {
                  Alert.alert(
                    "Medicine",
                    "Are you sure you want to remove this Medication?",
                    [
                      {
                        text: "Cancel"
                      },
                      {
                        text: "Yes",
                        onPress: () => {
                          this.setState({ loading: true });

                          this.props.deleteAlarm(
                            this.props.activeMedicine.id,
                            this.props.user.id
                          );
                          this.props
                            .deleteMedicine(
                              this.props.activeMedicine.id,
                              this.props.user.id
                            )
                            .then(() => {
                              this.setState({ loading: false });
                              Alert.alert(
                                "Medicine",
                                "Medicine successfully removed"
                              );
                              this.props.navigation.navigate("Home");
                            });
                        }
                      }
                    ]
                  );
                }}
              />
            </Card>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  getAlarm,
  deleteAlarm,
  deleteMedicine,
  addAlarm,
  loadingTrue,
  loadingFalse,
  retrieveMedicine
})(Profile);
