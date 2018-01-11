import React, { Component } from "react";
import { View, Alert, Text, ScrollView } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "./../auth";
import { retrieveUser } from "./../ducks/user";
import axios from "axios";

import { connect } from "react-redux";

class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      int: "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=",
      str: "",
      final: "",
      description: []
    };

    this.checkForInteractions = this.checkForInteractions.bind(this);
    this.deleteInteractions = this.deleteInteractions.bind(this);
  }

  deleteInteractions() {
    this.setState({ description: [] });
  }

  checkForInteractions() {
    const { id } = this.props.user;
    this.setState({ rendered: false });
    if (!this.state.description.length) {
      axios
        .post("http://localhost:3005/api/medicine", { id })
        .then(res => {
          res.data.map(({ rxcuis }, i) => {
            this.setState({ str: this.state.str + `${rxcuis}+` });
          });
          axios
            .get(`${this.state.int}${this.state.str}`)
            .then(res => {
              res.data.fullInteractionTypeGroup[0].fullInteractionType.map(
                (el, index) =>
                  this.state.description.push(el.interactionPair[0].description)
              );
              () => true;
            })
            .catch(console.log);
        })
        .catch(console.log);
    }
  }

  render() {
    return (
      <ScrollView style={{ paddingVertical: 20 }}>
        <Card title="Interactions">
          <Button
            buttonStyle={{ marginTop: 0 }}
            backgroundColor="#03A9F4"
            title="Check"
            onPress={() => this.checkForInteractions()}
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
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="Delete"
            onPress={() => this.deleteInteractions()}
          />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { retrieveUser })(Interaction);
