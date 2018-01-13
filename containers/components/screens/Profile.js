import React, { Component } from "react";
import {
  View,
  ScrollView,
  DatePickerAndroid,
  TimePickerAndroid
} from "react-native";
import { Card, Button, Text } from "react-native-elements";
import RNCalendarEvents from "react-native-calendar-events";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      month: "",
      day: "",
      hour: "",
      minutes: "",
      datePicker: false,
      yearEnd: "",
      monthEnd: "",
      dayEnd: "",
      hourEnd: "",
      minutesEnd: "",
      interval: 1,
      AlarmId: [],
      check: false
    };

    this.createAlarm = this.createAlarm.bind(this);
  }
  componentDidMount() {
    RNCalendarEvents.authorizeEventStore()
      .then(status => {
        console.log(status);
      })
      .catch(error => {
        console.log(error);
      });
  }

  createAlarm() {
    const {
      year,
      month,
      day,
      hour,
      minutes,
      yearEnd,
      monthEnd,
      dayEnd,
      hourEnd,
      minutesEnd,
      interval
    } = this.state;
    let startMonth = parseInt(month, 10) + 1;
    let endMonth = parseInt(monthEnd, 10) + 1;
    let minute = parseInt(minutes, 10) + 15;

    let startDate = `${year}-${startMonth.toString()}-${day}T${hour}:${minutes}:00.000Z`;
    let endDate = `${yearEnd}-${endMonth.toString()}-${dayEnd}T${hourEnd}:${minutesEnd}:00.000Z`;

    for (let i = startMonth; i <= endMonth; i++) {
      for (let d = day; d <= dayEnd; d++) {
        RNCalendarEvents.saveEvent("Alarm Title", {
          location: "location",
          notes: "notes",
          startDate: `${year}-${startMonth.toString()}-${d}T${hour}:${minutes}:00.000Z`,
          endDate: `${year}-${startMonth.toString()}-${d}T${hour}:${minute.toString()}:00.000Z`,
          alarms: [
            {
              date: -5
            }
          ]
        })
          .then(id => {
            d = d + interval;
            this.state.AlarmId.push(id);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  render() {
    const { navigation, medicine } = this.props;
    const { check } = this.state;
    console.log(medicine);
    return (
      <View style={{ paddingVertical: 20 }}>
        <Button onPress={() => this.setState({ check: true })}>Update</Button>
        {medicine.name.length ? (
          <View style={{ paddingVertical: 20 }}>
            <ScrollView>
              <Card
                title={medicine.name}
                image={{ uri: medicine.image }}
                editable={true}
              >
                <Text style={{ marginBottom: 20 }}>{medicine.description}</Text>
              </Card>

              <Card title="Alarm">
                <Text style={{ color: "white", fontSize: 28 }}>JD</Text>

                <Button
                  backgroundColor="#03A9F4"
                  title="Alarm"
                  onPress={this.createAlarm}
                />

                <Button
                  backgroundColor="red"
                  title="Set Start Date/Hour"
                  onPress={() => {
                    const { action, date } = DatePickerAndroid.open({
                      date: new Date()
                    }).then(result => {
                      this.setState({
                        year: result.year,
                        month: result.month,
                        day: result.day
                      });
                      TimePickerAndroid.open({}).then(result2 => {
                        this.setState({
                          hour: result2.hour,
                          minutes: result2.minute
                        });
                      });
                    });
                  }}
                />

                <Button
                  backgroundColor="green"
                  title="Set End Date/Hour"
                  onPress={() => {
                    const { action, date } = DatePickerAndroid.open({
                      date: new Date()
                    }).then(result => {
                      this.setState({
                        yearEnd: result.year,
                        monthEnd: result.month,
                        dayEnd: result.day
                      });
                      TimePickerAndroid.open({}).then(result2 => {
                        this.setState({
                          hourEnd: result2.hour,
                          minutesEnd: result2.minute
                        });
                      });
                    });
                  }}
                />
              </Card>
            </ScrollView>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
