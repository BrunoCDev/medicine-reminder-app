import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Linking,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  Alert
} from "react-native";
import { Card } from "react-native-elements";
import Button from "antd-mobile/lib/button";
import styled from "styled-components/native";
import axios from "axios";
const ImagePicker = require("react-native-image-picker");

import { connect } from "react-redux";

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
    this.state = {
      medicine: [],
      create: false,
      createButton: true,
      name: "",
      image:
        "http://drpattydental.com/wp-content/uploads/2017/05/placeholder.png",
      description: "",
      rxcuis: "",
      loaded: true,
      uri: ""
    };

    this.createNewMedicine = this.createNewMedicine.bind(this);
    this.getImage = this.getImage.bind(this);
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

  // CAMERA TEST

  getImage = () => {
    ImagePicker.showImagePicker({ cameraType: "back" }, response => {
      console.log(response.uri);
      let source = response.uri;
      this.setState({
        image: source
      });
      return true;
    });
  };

  createNewMedicine() {
    const { id } = this.props.user;
    const { name, image, description, medicine, loaded } = this.state;
    this.setState({ loaded: false });
    axios
      .get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${name}`)
      .then(res => {
        if (res.data.idGroup.rxnormId) {
          this.setState({ rxcuis: res.data.idGroup.rxnormId[0] });
          const { rxcuis } = this.state;
          axios
            .post("http://localhost:3005/api/createmedicine", {
              name,
              image,
              description,
              rxcuis,
              id
            })
            .then(res => {
              medicine.push(res.data);
              this.setState({ loaded: true });
              return null;
            })
            .catch(console.log);
        } else {
          this.setState({ loaded: true });
          Alert.alert("Medicine not found", "Make sure the name is right");
          return null;
        }
      })
      .catch(console.log);
  }

  render() {
    const { navigation, user } = this.props;
    const { loaded, createButton } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {createButton ? (
          <CreateButton
            onPress={() => this.setState({ create: true, createButton: false })}
          >
            <Text>Create New</Text>
          </CreateButton>
        ) : null}
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.create ? (
            <Card>
              <Image
                source={{ uri: this.state.image }}
                style={{ height: 300 }}
              />

              <EditButton onPress={this.getImage} style={{ marginTop: 20 }}>
                <Text>Get Image</Text>
              </EditButton>

              <TextInput
                onChangeText={e => this.setState({ name: e })}
                placeholder="Name"
                style={{ marginTop: 20 }}
              />

              <TextInput
                onChangeText={e => this.setState({ description: e })}
                placeholder="Description"
                style={{ marginTop: 20 }}
              />
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <EditButton
                  style={{
                    width: 50,
                    flex: 0.4,
                    alignSelf: "flex-start",
                    marginLeft: 30,
                    backgroundColor: "#cdc8b1"
                  }}
                  onPress={() => {
                    this.setState({ create: false, createButton: true });
                  }}
                >
                  <Text>Cancel</Text>
                </EditButton>

                <EditButton
                  style={{
                    width: 50,
                    flex: 0.4,
                    marginLeft: 70,
                    alignSelf: "flex-end",
                    backgroundColor: "#cdc8b1"
                  }}
                  onPress={() => {
                    this.createNewMedicine();
                    this.setState({ create: false, createButton: true });
                  }}
                >
                  <Text>Save</Text>
                </EditButton>
              </View>
            </Card>
          ) : null}

          {loaded
            ? this.state.medicine.map(({ name, image, description }, i) => (
                <Card
                  title={name}
                  image={{ uri: image }}
                  key={i}
                  editable={true}
                >
                  <Text style={{ marginBottom: 20 }}>{description}</Text>

                  <EditButton underlayColor={"red"} onPress={() => true}>
                    <Text style={{ fontSize: 30 }}>Edit</Text>
                  </EditButton>
                </Card>
              ))
            : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);
