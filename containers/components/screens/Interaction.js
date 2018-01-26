import React, { Component } from "react";
import { View, Alert, Text, ScrollView } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "./../auth";
import { retrieveUser } from "./../ducks/user";
import axios from "axios";

import { connect } from "react-redux";
import { loadingFalse, loadingTrue } from "./../ducks/user";
import { Loading } from "./Loading";
import { API_HOST } from "react-native-dotenv";

class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      int: "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=",
      str: "",
      final: "",
      description: [],
      loaded: false
    };

    this.checkForInteractions = this.checkForInteractions.bind(this);
    this.deleteInteractions = this.deleteInteractions.bind(this);
  }

  componentDidMount() {
    this.props.loadingFalse();
  }

  deleteInteractions() {
    this.setState({ description: [] });
  }

  checkForInteractions() {
    const { id } = this.props.user;
    if (!this.state.description.length) {
      axios
        .get(`${API_HOST}/api/medicine/${id}`)
        .then(res => {
          res.data.map(({ rxcuis }, i) => {
            this.setState({ str: this.state.str + `${rxcuis}+` });
          });
          axios
            .get(`${this.state.int}${this.state.str}`)
            .then(res2 => {
              if (res2.data.fullInteractionTypeGroup) {
                Alert.alert(
                  "Bad Reactions Found",
                  `These medications might have some side effects when taken together!`
                );
                res2.data.fullInteractionTypeGroup[0].fullInteractionType.map(
                  (el, index) => {
                    this.state.description.push(
                      el.interactionPair[0].description
                    );
                    this.props.loadingFalse();
                    this.setState({ loaded: true });
                  }
                );
              } else {
                this.props.loadingFalse();
                Alert.alert(
                  "No Bad Reactions Found",
                  `We didn't find any bad reactions between these medicines`
                );
              }
            })
            .catch(console.log);
        })
        .catch(console.log);
    }
  }

  render() {
    this.props.loading ? <Loading /> : null;
    return (
      <ScrollView style={{ paddingVertical: 20 }}>
        <Card title="Interactions">
          <Button
            buttonStyle={{ marginTop: 0 }}
            backgroundColor="#a7a7a7"
            title="Check"
            onPress={() => {
              this.props.loadingTrue();
              this.checkForInteractions();
            }}
          />

          {this.state.description.length ? (
            this.state.description.map((el, i) => (
              <Text
                key={i}
                style={{ color: "grey", textAlign: "center", marginTop: 10 }}
              >
                {el}
              </Text>
            ))
          ) : (
            <Text style={{ color: "grey", textAlign: "center", marginTop: 10 }}>
              No Bad Interactions Found
            </Text>
          )}
          {this.state.description.length ? (
            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#a7a7a7"
              title="Delete"
              onPress={() => {
                this.deleteInteractions();
                this.setState({ loaded: false });
              }}
            />
          ) : null}
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  retrieveUser,
  loadingFalse,
  loadingTrue
})(Interaction);
