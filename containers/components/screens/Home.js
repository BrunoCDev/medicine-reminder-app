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
      name: "",
      image: "No Picture Found",
      description: "",
      rxcuis: "",
      loaded: false
    };

    this.createNewMedicine = this.createNewMedicine.bind(this);
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

  createNewMedicine() {
    const { id } = this.props.user;
    const { name, image, description, medicine } = this.state;
    axios
      .get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${name}`)
      .then(res => {
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
          })
          .catch(console.log);
      })
      .catch(console.log);
  }

  render() {
    const { navigation, user } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CreateButton onPress={() => this.setState({ create: true })}>
          <Text>Create New</Text>
        </CreateButton>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.create ? (
            <Card>
              <TextInput
                onChangeText={e => this.setState({ name: e })}
                placeholder="Name"
              />
              <TextInput
                onChangeText={e => this.setState({ image: e })}
                placeholder="Image"
              />
              <TextInput
                onChangeText={e => this.setState({ description: e })}
                placeholder="Description"
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
                    this.setState({ create: false });
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
                    this.setState({ create: false });
                  }}
                >
                  <Text>Save</Text>
                </EditButton>
              </View>
            </Card>
          ) : null}
          {this.state.medicine.map(({ name, image, description }, i) => (
            <Card
              title={name}
              image={{ uri: image || this.state.image }}
              key={i}
              editable={true}
            >
              <Text style={{ marginBottom: 10 }}>{description}</Text>

              <EditButton underlayColor={"red"} onPress={() => true}>
                <Text style={{ fontSize: 30 }}>Edit</Text>
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
