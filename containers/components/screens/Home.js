import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Linking,
  View,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Card } from "react-native-elements";
import Button from "antd-mobile/lib/button";
import styled from "styled-components/native";
import axios from "axios";

import { connect } from "react-redux";

const images = [
  {
    key: 1,
    name: "Nathan Anderson",
    image: require("../images/1.jpg"),
    url: "https://unsplash.com/photos/C9t94JC4_L8"
  },
  {
    key: 2,
    name: "Jamison McAndie",
    image: require("../images/2.jpg"),
    url: "https://unsplash.com/photos/waZEHLRP98s"
  },
  {
    key: 3,
    name: "Alberto Restifo",
    image: require("../images/3.jpg"),
    url: "https://unsplash.com/photos/cFplR9ZGnAk"
  },
  {
    key: 4,
    name: "John Towner",
    image: require("../images/4.jpg"),
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  }
];

const EditButton = styled.TouchableHighlight`
  background-color: #ddba79;
  height: 50;
  align-items: center;
  justify-content: center;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicine: []
    };
  }

  componentDidMount() {
    const { id } = this.props.user;
    axios
      .post("http://localhost:3005/api/medicine", { id })
      .then(res => {
        this.setState({ medicine: res.data });
      })
      .catch(console.log);
  }

  render() {
    const { navigation, user } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.medicine.map(({ name, image, description }, i) => (
            <Card title={name} image={{ uri: image }} key={i} editable={true}>
              <Text style={{ marginBottom: 10 }}>{description}</Text>
              <EditButton underlayColor={"red"} onPress={() => true}>
                <Text style={{ color: "white", fontSize: 30 }}>Edit</Text>
              </EditButton>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);
