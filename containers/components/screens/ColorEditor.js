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
      firstColor: "",
      secondColor: "",
      thirdColor: "",
      buttonColor: "",
      cardColor: "",
      textColor: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
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
        <Text>Background Colors</Text>
        <TextInput
          placeholder={`${first}`}
          onChangeText={e => this.setState({ firstColor: e.toLowerCase() })}
        />
        <TextInput
          placeholder={`${second}`}
          onChangeText={e => this.setState({ secondColor: e.toLowerCase() })}
        />
        <TextInput
          placeholder={`${third}`}
          onChangeText={e => this.setState({ thirdColor: e.toLowerCase() })}
        />

        <Text>Button Color</Text>
        <TextInput
          placeholder={`${button}`}
          onChangeText={e => this.setState({ buttonColor: e.toLowerCase() })}
        />

        <Text>Card Color</Text>
        <TextInput
          placeholder={`${card}`}
          onChangeText={e => this.setState({ cardColor: e.toLowerCase() })}
        />

        <Text>Text Color</Text>
        <TextInput
          placeholder={`${textcolor}`}
          onChangeText={e => this.setState({ textColor: e.toLowerCase() })}
        />

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
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  createColors,
  getColors,
  updateColors
})(ColorEditor);
