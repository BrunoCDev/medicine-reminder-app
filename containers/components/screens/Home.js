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

import { Card } from "react-native-elements";
import Button from "antd-mobile/lib/button";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import Menu from "./../extras/Menu";

import { retrieveMedicine } from "./../ducks/user";

const EditButton = styled.TouchableHighlight`
  background-color: #ddba79;
  height: 50;
  align-items: center;
  justify-content: center;
`;

const CreateButton = styled.TouchableHighlight`
  background-color: #cdc8b1;
  height: 50;
  align-items: center;
  justify-content: center;
`;

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
    console.log(newProps);
  }

  render() {
    const { navigation, user } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CreateButton onPress={() => navigation.navigate("Create")}>
          <Text>Create New</Text>
        </CreateButton>

        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.props.medicine.map(({ name, image, description }, i) => (
            <Card title={name} image={{ uri: image }} key={i} editable={true}>
              <Text style={{ marginBottom: 20 }}>{description}</Text>

              <EditButton
                underlayColor={"red"}
                onPress={() => medicine.splice(i, 1)}
              >
                <Text style={{ fontSize: 30 }}>Remove</Text>
              </EditButton>
            </Card>
          ))}
        </ScrollView>
        {/* MENU BUTTONS! */}
        <Menu />
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { retrieveMedicine })(Home);

// MENU BUTTONS STYLE
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
