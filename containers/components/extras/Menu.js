import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Menu extends Component {
  render() {
    return (
      <ActionButton
        buttonColor="#83B3D8"
        active={false}
        style={{ elevation: 10 }}
        position={"right"}
        autoInactive={true}
      >
        <ActionButton.Item
          buttonColor="#9b59b6"
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="pill" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#3498db"
          onPress={() => navigation.navigate("Interaction")}
        >
          <Icon name="link-variant" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#1abc9c"
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="face-profile" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
