import React, { Component } from "react";
import { View, Alert, Text, ScrollView, TextInput, Button } from "react-native";
import { backgroundColors } from "./../ducks/user";
import axios from "axios";

import { connect } from "react-redux";

import { createColors, getColors, updateColors } from "./../ducks/user";

class ColorEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstColor: `${this.props.backgroundColors.first}`,
      secondColor: `${this.props.backgroundColors.second}`,
      thirdColor: `${this.props.backgroundColors.third}`,
      buttonColor: `${this.props.backgroundColors.button}`,
      cardColor: `${this.props.backgroundColors.card}`,
      textColor: `${this.props.backgroundColors.textcolor}`
    };
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
      textcolor
    } = this.props.backgroundColors;
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 10 }}>
          Background Colors
        </Text>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder={`${first}`}
          onChangeText={e => this.setState({ firstColor: e.toLowerCase() })}
        />
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder={`${second}`}
          onChangeText={e => this.setState({ secondColor: e.toLowerCase() })}
        />
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder={`${third}`}
          onChangeText={e => this.setState({ thirdColor: e.toLowerCase() })}
        />

        <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 10 }}>
          Button Color
        </Text>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder={`${button}`}
          onChangeText={e => this.setState({ buttonColor: e.toLowerCase() })}
        />

        <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 10 }}>
          Card/Footer Color
        </Text>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder={`${card}`}
          onChangeText={e => this.setState({ cardColor: e.toLowerCase() })}
        />

        <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 10 }}>
          Text Color
        </Text>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder={`${textcolor}`}
          onChangeText={e => this.setState({ textColor: e.toLowerCase() })}
        />
        <View style={{ marginTop: 20 }}>
          {this.props.backgroundColors.id ? (
            <Button
              title="Update"
              onPress={() => {
                const { id } = this.props.user;
                this.props.updateColors({
                  firstColor: this.state.firstColor,
                  secondColor: this.state.secondColor,
                  thirdColor: this.state.thirdColor,
                  buttonColor: this.state.buttonColor,
                  cardColor: this.state.cardColor,
                  textColor: this.state.textColor,
                  id: id
                });
                this.props.navigation.navigate("Home");
              }}
            />
          ) : (
            <Button
              title="Save"
              onPress={() => {
                const { id } = this.props.user;
                this.props.createColors({
                  firstColor: this.state.firstColor,
                  secondColor: this.state.secondColor,
                  thirdColor: this.state.thirdColor,
                  buttonColor: this.state.buttonColor,
                  cardColor: this.state.cardColor,
                  textColor: this.state.textColor,
                  id: id
                });
                this.props.navigation.navigate("Home");
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  createColors,
  getColors,
  updateColors
})(ColorEditor);
