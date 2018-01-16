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
  StyleSheet
} from "react-native";

import { Card, Button } from "react-native-elements";
// import Button from "antd-mobile/lib/button";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import Menu from "./../extras/Menu";

import {
  retrieveMedicine,
  editMedicine,
  deleteMedicine
} from "./../ducks/user";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props.user;
    this.props.retrieveMedicine(id);
  }

  componentWillReceiveProps(newProps) {
    // this.props.retrieveMedicine(id);
  }

  render() {
    const { navigation, user, medicine } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#e2e2e2" }}>
        <Button
          raised
          buttonStyle={{ backgroundColor: "#a7a7a7" }}
          title="Create New"
          onPress={() => navigation.navigate("Create")}
        />

        <ScrollView contentContainerStyle={{ paddingVertical: 15 }}>
          {medicine.map(({ name, image, description, id }) => (
            <Card
              title={name}
              titleStyle={{
                fontSize: 30,
                color: "#a7a7a7"
              }}
              image={{ uri: image }}
              imageStyle={{ height: 250 }}
              key={id}
              editable={true}
            >
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 15,
                  color: "#a7a7a7",
                  marginLeft: 15
                }}
              >
                {description}
              </Text>

              <Button
                small
                title={"Edit"}
                buttonStyle={{ width: 200, backgroundColor: "#a7a7a7" }}
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
                  backgroundColor: "#a7a7a7",
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
        {/* <Menu navigate={this.props.navigation.navigate} /> */}
        <ActionButton
          buttonColor="#a7a7a7"
          active={false}
          style={{ elevation: 10, marginLeft: 10 }}
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
