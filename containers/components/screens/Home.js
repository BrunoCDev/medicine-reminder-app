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

import AnimatedLinearGradient, {
  presetColors
} from "react-native-animated-linear-gradient";

import {
  retrieveMedicine,
  editMedicine,
  deleteMedicine,
  getColors
} from "./../ducks/user";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props.user;
    this.props.retrieveMedicine(id);
    this.props.getColors(id);
  }

  componentWillReceiveProps(newProps) {}

  render() {
    const { navigation, user, medicine, backgroundColors } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <AnimatedLinearGradient
          customColors={[
            `${backgroundColors.first}`,
            `${backgroundColors.second}`,
            `${backgroundColors.third}`
          ]}
          speed={6000}
        />
        <Button
          raised
          buttonStyle={{
            backgroundColor: `${backgroundColors.button}`
          }}
          title="Create New"
          onPress={() => navigation.navigate("Create")}
        />
        <ScrollView>
          {medicine.map(({ name, image, description, id }, i) => (
            <Card
              containerStyle={{
                backgroundColor: `${backgroundColors.card}`
              }}
              title={name}
              titleStyle={{
                fontSize: 30,
                color: `${backgroundColors.textcolor}`
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
                  color: `${backgroundColors.textcolor}`,
                  marginLeft: 15
                }}
              >
                {description}
              </Text>

              <Button
                small
                title={"Set Alarm"}
                buttonStyle={{
                  width: 200,
                  backgroundColor: `${backgroundColors.button}`
                }}
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
                  backgroundColor: `${backgroundColors.button}`,
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
        </ScrollView>
        {/* MENU BUTTONS! */}
        <ActionButton
          buttonColor={`${backgroundColors.button}`}
          active={true}
          style={{ marginLeft: 10 }}
          position={"right"}
          autoInactive={true}
        >
          <ActionButton.Item
            buttonColor={`${backgroundColors.button}`}
            onPress={() => navigation.navigate("Interaction")}
          >
            <Icon name="link-variant" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={`${backgroundColors.button}`}
            onPress={() => navigation.navigate("Colors")}
          >
            <Icon name="palette" style={styles.actionButtonIcon} />
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
  deleteMedicine,
  getColors
})(Home);

// MENU BUTTONS STYLE
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
