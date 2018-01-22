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

import { getAlarm, deleteAlarm } from "./../ducks/user";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: ""
    };
  }

  componentDidMount() {
    this.props.getAlarm(this.props.activeMedicine.id, this.props.user.id);
  }

  createNewAlarm() {
    const { id } = this.props.user;
    const { description, name } = this.props.activeMedicine;
    const { interval } = this.state;
    const medicineId = this.props.activeMedicine.id.toString();
    let final = new Date(`${this.state.startDate}${this.state.time}`);
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
    Alert.alert("Alarm", "Alarm was sucessfully added");
  }

  render() {
    const { navigation, activeMedicine, backgroundColors } = this.props;
    return (
      <View style={{ paddingVertical: 20, backgroundColor: "#e2e2e2" }}>
        <AnimatedLinearGradient
          customColors={[
            `${backgroundColors.first}`,
            `${backgroundColors.second}`,
            `${backgroundColors.third}`
          ]}
          speed={5000}
        />
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
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
            imageStyle={{ height: 310 }}
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
            <Text
              style={{
                marginBottom: 15,
                fontSize: 18,
                textAlign: "center",
                color: `${backgroundColors.textcolor}`
              }}
            >
              Interval
            </Text>
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
              <Picker.Item label="One Time Only" value={null} />
              <Picker.Item label="Every Minute" value="minute" />
              <Picker.Item label="Daily" value="day" />
              <Picker.Item label="Weekly" value="week" />
            </Picker>

            <Button
              backgroundColor={`${backgroundColors.button}`}
              title="Set Date/Hour"
              buttonStyle={{ marginBottom: 15 }}
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
            />
            {this.props.alarm ? (
              <Button
                backgroundColor={`${backgroundColors.button}`}
                buttonStyle={{ marginBottom: 15 }}
                title="Delete Alarm"
                onPress={() => {
                  console.log(this.props.activeMedicine.id, this.props.user.id);
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
            ) : (
              <Button
                backgroundColor={`${backgroundColors.button}`}
                buttonStyle={{ marginBottom: 15 }}
                title="Add Alarm"
                onPress={() => this.createNewAlarm()}
              />
            )}
          </Card>
        </ScrollView>
        <PushController />
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getAlarm, deleteAlarm })(Profile);
