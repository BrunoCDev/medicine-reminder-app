import React from "react";
import {
  ScrollView,
  Text,
  Linking,
  View,
  TouchableHighlight
} from "react-native";
import { Card } from "react-native-elements";
import Button from "antd-mobile/lib/button";
import styled from "styled-components/native";

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

export default ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {images.map(({ name, image, url, key }) => (
        <Card title={`CARD ${key}`} image={image} key={key} editable={true}>
          <Text style={{ marginBottom: 10 }}>Photo by {name}.</Text>
          <EditButton underlayColor={"red"} onPress={() => true}>
            <Text style={{ color: "white", fontSize: 30 }}>Edit</Text>
          </EditButton>
        </Card>
      ))}
    </ScrollView>
  </View>
);

const EditButton = styled.TouchableHighlight`
  background-color: #ddba79;
  height: 50;
  align-items: center;
  justify-content: center;
`;
