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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createNewAlarm() {
    const { description, name, id } = this.props.activeMedicine;
    let final = new Date(`${this.state.startDate}${this.state.time}`);
    PushNotification.localNotificationSchedule({
      id: this.props.activeMedicine.id.toString(),
      title: name,
      message: description,
      vibrate: true,
      vibration: 1000,
      repeatType: this.state.interval,
      date: final
    });
    Alert.alert("Alarm", "Alarm was sucessfully added");
  }

  render() {
    const { navigation, activeMedicine } = this.props;
    return (
      <View style={{ paddingVertical: 20, backgroundColor: "#e2e2e2" }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          <Card
            titleStyle={{
              fontSize: 30,
              color: "#a7a7a7"
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
                color: "#a7a7a7"
              }}
            >
              {activeMedicine.description}
            </Text>
            <Picker
              style={{ color: "#a7a7a7", marginBottom: 10 }}
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
              backgroundColor="#a7a7a7"
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

            <Button
              backgroundColor="#a7a7a7"
              buttonStyle={{ marginBottom: 15 }}
              title="Add Alarm"
              onPress={() => this.createNewAlarm()}
            />

            <Button
              backgroundColor="#a7a7a7"
              buttonStyle={{ marginBottom: 15 }}
              title="Delete Alarm"
              onPress={() => {
                PushNotification.cancelAllLocalNotifications({
                  id: this.props.activeMedicine.id.toString()
                });
                Alert.alert("Alarm", "Alarm was sucessfully removed");
              }}
            />
          </Card>
        </ScrollView>
        <PushController />
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
