import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = StyleSheet.create({
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: "white"
      }
    });
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
          onPress={() => navigate("Home")}
        >
          <Icon name="pill" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#3498db"
          onPress={() => navigate("Interaction")}
        >
          <Icon name="link-variant" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}
