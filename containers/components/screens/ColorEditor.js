import React, { Component } from "react";
import {
  View,
  Alert,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableWithoutFeedback
} from "react-native";
import { backgroundColors } from "./../ducks/user";
import axios from "axios";

import { ColorPicker } from "react-native-color-picker";

import { connect } from "react-redux";
import { Loading } from "./Loading";

import {
  createColors,
  getColors,
  updateColors,
  loadingTrue,
  loadingFalse
} from "./../ducks/user";

class ColorEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPicker: false,
      firstColor: `${this.props.backgroundColors.first}`,
      secondColor: `${this.props.backgroundColors.second}`,
      thirdColor: `${this.props.backgroundColors.third}`,
      buttonColor: `${this.props.backgroundColors.button}`,
      cardColor: `${this.props.backgroundColors.card}`,
      textColor: `${this.props.backgroundColors.textcolor}`,
      footer_icon: `${this.props.backgroundColors.footer_icon}`
    };
  }

  componentDidMount() {
    this.props.loadingFalse();
  }

  render() {
    const {
      firstColor,
      secondColor,
      thirdColor,
      buttonColor,
      cardColor,
      textColor
    } = this.state;
    const {
      first,
      second,
      third,
      button,
      card,
      textcolor,
      footer_icon
    } = this.props.backgroundColors;
    this.props.loading ? <Loading /> : null;
    return (
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        {this.state.colorPicker === true ? (
          <ColorPicker
            onColorSelected={color => {
              Alert.alert("Color", "Color Selected!");
              this.props.loadingTrue();
              let val = color;
              let key = this.state.selectedItem;
              let obj = {};
              obj[key] = val;
              obj.colorPicker = false;
              this.setState(obj);
              this.props.loadingFalse();
            }}
            style={{ flex: 1 }}
          />
        ) : (
          <View>
            <ScrollView>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 25,
                  marginLeft: 10,
                  textAlign: "center"
                }}
              >
                Background
              </Text>

              <Button
                title=""
                color={firstColor}
                onPress={() =>
                  this.setState({
                    colorPicker: true,
                    selectedItem: "firstColor"
                  })
                }
              />
              <Text />

              <Button
                title=""
                color={secondColor}
                onPress={() =>
                  this.setState({
                    colorPicker: true,
                    selectedItem: "secondColor"
                  })
                }
              />
              <Text />
              <Button
                title=""
                color={thirdColor}
                onPress={() =>
                  this.setState({
                    colorPicker: true,
                    selectedItem: "thirdColor"
                  })
                }
              />

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 25,
                  marginLeft: 10,
                  textAlign: "center"
                }}
              >
                Card/Footer Background
              </Text>
              <Button
                title=""
                color={cardColor}
                onPress={() =>
                  this.setState({
                    colorPicker: true,
                    selectedItem: "cardColor"
                  })
                }
              />

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 25,
                  marginLeft: 10,
                  textAlign: "center"
                }}
              >
                Button
              </Text>
              <Button
                title=""
                color={buttonColor}
                onPress={() =>
                  this.setState({
                    colorPicker: true,
                    selectedItem: "buttonColor"
                  })
                }
              />

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 25,
                  marginLeft: 10,
                  textAlign: "center"
                }}
              >
                Footer Icon
              </Text>
              <Button
                title=""
                color={this.state.footer_icon}
                onPress={() =>
                  this.setState({
                    colorPicker: true,
                    selectedItem: "footer_icon"
                  })
                }
              />

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 25,
                  marginLeft: 10,
                  textAlign: "center"
                }}
              >
                Text
              </Text>
              <Button
                title=""
                color={textColor}
                onPress={() =>
                  this.setState({
                    colorPicker: true,
                    selectedItem: "textColor"
                  })
                }
              />
            </ScrollView>

            <View style={{ marginTop: 20 }}>
              {this.props.backgroundColors.id ? (
                <Button
                  title="Update"
                  color={this.props.backgroundColors.button}
                  onPress={() => {
                    this.props.loadingTrue();
                    const { id } = this.props.user;
                    this.props.updateColors({
                      firstColor: this.state.firstColor,
                      secondColor: this.state.secondColor,
                      thirdColor: this.state.thirdColor,
                      buttonColor: this.state.buttonColor,
                      cardColor: this.state.cardColor,
                      textColor: this.state.textColor,
                      footer_icon: this.state.footer_icon,
                      id: id
                    });
                    this.props.navigation.navigate("Home");
                  }}
                />
              ) : (
                <Button
                  title="Save"
                  color={this.props.backgroundColors.button}
                  onPress={() => {
                    this.props.loadingTrue();
                    Alert.alert("Color Editor", "Theme was sucessfully saved!");
                    const { id } = this.props.user;
                    this.props
                      .createColors({
                        firstColor: this.state.firstColor,
                        secondColor: this.state.secondColor,
                        thirdColor: this.state.thirdColor,
                        buttonColor: this.state.buttonColor,
                        cardColor: this.state.cardColor,
                        textColor: this.state.textColor,
                        footer_icon: this.state.footer_icon,
                        id: id
                      })
                      .then(() => this.props.getColors(id));
                    this.props.navigation.navigate("Home");
                  }}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  createColors,
  getColors,
  updateColors,
  loadingTrue,
  loadingFalse
})(ColorEditor);
