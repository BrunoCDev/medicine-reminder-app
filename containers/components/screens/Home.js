import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import {
  ScrollView,
  Text,
  Linking,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  Animated
} from "react-native";

import { Card, Button } from "react-native-elements";
// import Button from "antd-mobile/lib/button";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import Menu from "./../extras/Menu";

import LinearGradient from "react-native-linear-gradient";

import {
  retrieveMedicine,
  editMedicine,
  deleteMedicine
} from "./../ducks/user";

function incrementColor(color, step) {
  const intColor = parseInt(color.substr(1), 16);
  const newIntColor = (intColor + step).toString(16);
  return `#${"0".repeat(6 - newIntColor.length)}${newIntColor}`;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      colorTop: "#000000",
      colorBottom: "#cccccc"
    };
  }

  componentDidMount() {
    const { id } = this.props.user;
    this.props.retrieveMedicine(id);

    setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: incrementColor(this.state.colorTop, 1),
        colorBottom: incrementColor(this.state.colorBottom, -1)
      });
    }, 20);
  }

  componentWillReceiveProps(newProps) {
    // this.props.retrieveMedicine(id);
  }

  render() {
    const { navigation, user, medicine } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: this.state.colorTop }}>
        <Button
          raised
          buttonStyle={{ backgroundColor: this.state.colorTop }}
          title="Create New"
          onPress={() => navigation.navigate("Create")}
        />
        <ScrollView>
          <LinearGradient
            colors={[this.state.colorBottom, this.state.colorTop]}
          >
            {medicine.map(({ name, image, description, id }, i) => (
              <Card
                containerStyle={{ backgroundColor: "transparent" }}
                title={name}
                titleStyle={{
                  fontSize: 30,
                  color: "#ffffff"
                }}
                image={{ uri: image }}
                imageStyle={{ height: 300 }}
                key={id}
                editable={true}
              >
                <Text
                  style={{
                    marginBottom: 15,
                    fontSize: 20,
                    color: "#ffffff",
                    marginLeft: 15
                  }}
                >
                  {description}
                </Text>

                <Button
                  small
                  title={"Set Alarm"}
                  buttonStyle={{ width: 200, backgroundColor: "#cccccc" }}
                  textStyle={{ fontSize: 15, letterSpacing: 10 }}
                  onPress={() => {
                    this.props
                      .editMedicine(id)
                      .then(() => navigation.navigate("Profile"));
                  }}
                />
                <Button
                  small
                  title={"Delete"}
                  buttonStyle={{
                    width: 200,
                    backgroundColor: "#cccccc",
                    marginTop: 20
                  }}
                  textStyle={{ fontSize: 15, letterSpacing: 10 }}
                  onPress={() => {
                    this.props
                      .deleteMedicine(id, this.props.user.id)
                      .then(() =>
                        this.props.retrieveMedicine(this.props.user.id)
                      );
                    Alert.alert("Medicine", "Medicine sucessfully removed");
                  }}
                />
              </Card>
            ))}
          </LinearGradient>
        </ScrollView>
        {/* MENU BUTTONS! */}
        <ActionButton
          buttonColor="#a7a7a7"
          active={false}
          style={{ marginLeft: 10 }}
          position={"right"}
          autoInactive={true}
        >
          <ActionButton.Item
            buttonColor="#a7a7a7"
            onPress={() => navigation.navigate("Interaction")}
          >
            <Icon name="link-variant" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  retrieveMedicine,
  editMedicine,
  deleteMedicine
})(Home);

// MENU BUTTONS STYLE
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
