import React, { Component } from "react";
import { View, Alert, Text, ScrollView, TextInput, Button } from "react-native";
import { backgroundColors } from "./../ducks/user";
import axios from "axios";

import { connect } from "react-redux";

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

  render() {
    const {
      firstColor,
      secondColor,
      thirdColor,
      buttonColor,
      cardColor,
      textColor
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text>Background Colors</Text>
        <TextInput
          placeholder="First Color"
          onChangeText={e => this.setState({ firstColor: e.toLowerCase() })}
        />
        <TextInput
          placeholder="Second Color"
          onChangeText={e => this.setState({ secondColor: e.toLowerCase() })}
        />
        <TextInput
          placeholder="Third Color"
          onChangeText={e => this.setState({ thirdColor: e.toLowerCase() })}
        />

        <Text>Button Color</Text>
        <TextInput
          placeholder="Button Color"
          onChangeText={e => this.setState({ buttonColor: e.toLowerCase() })}
        />

        <Text>Card Color</Text>
        <TextInput
          placeholder="Card Color"
          onChangeText={e => this.setState({ cardColor: e.toLowerCase() })}
        />

        <Text>Text Color</Text>
        <TextInput
          placeholder="Text Color"
          onChangeText={e => this.setState({ textColor: e.toLowerCase() })}
        />

        <Button
          title="Save"
          onPress={() => {
            let obj = {
              firstColor: this.state.firstColor,
              secondColor: this.state.secondColor,
              thirdColor: this.state.thirdColor,
              buttonColor: this.state.buttonColor,
              cardColor: this.state.cardColor,
              textColor: this.state.textColor
            };
            this.props.backgroundColors(obj);
            this.props.navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { backgroundColors })(ColorEditor);
