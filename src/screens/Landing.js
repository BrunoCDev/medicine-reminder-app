import React, { Component } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
  Right,
  Footer,
  FooterTab
} from "native-base";
import { Image, View, StyleSheet, ScrollView } from "react-native";

import HomePage from "./../images/HomePage.png";
import ColorEditorPage from "./../images/ColorEditorPage.png";
import InteractionsPage from "./../images/InteractionsPage.png";
import MedicineEditorPage from "./../images/MedicineEditorPage.png";

import Carousel from "react-native-snap-carousel";
import { Loading } from "./Loading";

import { loadingFalse } from "./../ducks/user";
import { connect } from "react-redux";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [HomePage, ColorEditorPage, InteractionsPage, MedicineEditorPage]
    };
  }

  componentDidMount() {
    this.setState({
      images: [HomePage, ColorEditorPage, InteractionsPage, MedicineEditorPage]
    });
    this.props.loadingFalse();
  }

  _renderItem({ item, index }) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Image
            resizeMode="contain"
            source={item}
            style={{ height: 450, width: 370 }}
          />
        </ScrollView>
      </View>
    );
  }
  render() {
    const styles = StyleSheet.create({
      image: {
        height: 450,
        width: 370
      }
    });
    this.props.loading ? <Loading /> : null;
    return (
      <View style={{ flex: 1 }}>
        {this.props.loading ? null : (
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.images}
            renderItem={this._renderItem}
            sliderWidth={370}
            itemWidth={370}
            autoplay={true}
            loop={true}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Button
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={{
              width: 150,
              height: 45,
              marginBottom: 20
            }}
          >
            <Text>Sign Up</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("SignIn")}
            style={{
              width: 150,
              height: 45,
              marginBottom: 20
            }}
          >
            <Text>Sign In</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { loadingFalse })(Landing);
