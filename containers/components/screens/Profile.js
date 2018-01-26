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
import PushController from "./../extras/PushController";
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
  loadingFalse
} from "./../ducks/user";

import { Loading } from "./Loading";

import moment from "moment";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: "day"
    };
  }

  componentDidMount() {
    this.props.loadingTrue();
    this.props
      .getAlarm(this.props.activeMedicine.id, this.props.user.id)
      .then(() => {
        this.props.loadingFalse();
      });
  }

  createNewAlarm() {
    const { id } = this.props.user;
    const { description, name } = this.props.activeMedicine;
    const { interval } = this.state;
    const medicineId = this.props.activeMedicine.id.toString();
    let final = new Date(`${this.state.startDate}T${this.state.time}`);
    PushNotification.localNotificationSchedule({
      id: medicineId,
      title: name,
      message: description,
      vibrate: true,
      vibration: 1000,
      repeatType: interval,
      date: final
    });
    this.props.addAlarm(
      medicineId,
      id,
      interval,
      `${this.state.startDate} ${this.state.time}`,
      this.state.displayDate,
      this.state.displayTime
    );
    Alert.alert("Alarm", "Alarm was sucessfully added");
  }

  render() {
    const { navigation, activeMedicine, backgroundColors } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.props.loading ? (
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
              imageStyle={{ height: 250 }}
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
                    Interval: {this.props.alarm.interval}
                  </Text>
                  <Button
                    color={`${backgroundColors.textcolor}`}
                    backgroundColor={`${backgroundColors.button}`}
                    buttonStyle={{ marginBottom: 10, marginTop: 10 }}
                    title="Delete Alarm"
                    onPress={() => {
                      PushNotification.cancelLocalNotifications({
                        id: this.props.activeMedicine.id.toString()
                      });
                      this.props.deleteAlarm(
                        this.props.activeMedicine.id,
                        this.props.user.id
                      );
                      Alert.alert("Alarm", "Alarm was sucessfully removed");
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
                      color={`${backgroundColors.textcolor}`}
                      backgroundColor={`${backgroundColors.button}`}
                      title="Set Date"
                      buttonStyle={{ marginBottom: 15, width: 125 }}
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
                            displayDate: `${r.year}-${month}-${day}`,
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
                              displayTime: `${hour}:${minutes}`,
                              time: `${hour}:${minutes}:00`
                            });
                          });
                        });
                      }}
                    />
                    <Button
                      color={`${backgroundColors.textcolor}`}
                      backgroundColor={`${backgroundColors.button}`}
                      buttonStyle={{ marginBottom: 10, width: 125 }}
                      title="Add Alarm"
                      onPress={() => this.createNewAlarm()}
                    />
                  </View>
                </View>
              )}
              <Button
                small
                color={`${backgroundColors.textcolor}`}
                backgroundColor={`${backgroundColors.button}`}
                title={"Delete"}
                textStyle={{
                  fontSize: 15,
                  letterSpacing: 10
                }}
                onPress={() => {
                  this.props.deleteAlarm(
                    this.props.activeMedicine.id,
                    this.props.user.id
                  );
                  this.props
                    .deleteMedicine(
                      this.props.activeMedicine.id,
                      this.props.user.id
                    )
                    .then(() => this.props.navigation.navigate("Home"));
                  Alert.alert("Medicine", "Medicine sucessfully removed");
                }}
              />
            </Card>
            <PushController navigate={this.props.navigation.navigate} />
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
  loadingFalse
})(Profile);
