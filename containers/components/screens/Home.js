import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import {
  ScrollView,
  Linking,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Thumbnail,
  Body,
  Button,
  Footer,
  FooterTab
} from "native-base";

import { Loading } from "./Loading";

import { Card } from "react-native-elements";
// import Button from "antd-mobile/lib/button";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import Menu from "./../extras/Menu";

import AnimatedLinearGradient, {
  presetColors
} from "react-native-animated-linear-gradient";

import {
  retrieveMedicine,
  editMedicine,
  deleteMedicine,
  getColors,
  resetActiveMedicine,
  deleteColors,
  getUserById,
  loadingFalse,
  loadingTrue
} from "./../ducks/user";

class Home extends Component {
  constructor(props) {
    super(props);

    this.bounceValue = new Animated.Value(0);

    this.state = {};
  }

  componentDidMount() {
    this.props.loadingTrue();
    AsyncStorage.getItem("user").then(result => {
      if (result) {
        this.props.getUserById(result).then(res => {
          if (this.props.user) {
            const { id } = this.props.user;
            this.props.retrieveMedicine(id).then(() => {
              this.props.loadingFalse();
              if (!this.props.medicine.length) {
                setTimeout(
                  () =>
                    Alert.alert(
                      "Instructions",
                      `You can Click the "+" sign below to get started!`
                    ),
                  1000
                );
              }
            });
          }
        });
      } else {
        this.props.navigation.navigate("SignUp");
      }
    });
    // this.props.getColors(id);
    // this.props.resetActiveMedicine();
  }

  componentWillReceiveProps(newProps) {}

  render() {
    const { navigation, user, medicine, backgroundColors } = this.props;

    const styles = StyleSheet.create({
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: "white"
      },
      footerButton: {
        fontSize: 25,
        color: `${backgroundColors.textcolor}`
      },
      footer: {
        backgroundColor: `${backgroundColors.card}`
      },
      title: {
        color: `${backgroundColors.textcolor}`,
        fontSize: 23
      },
      description: {
        color: `${backgroundColors.textcolor}`,
        fontSize: 15
      }
    });

    return (
      <View style={{ flex: 1 }}>
        {this.props.loading ? (
          <Loading />
        ) : (
          <Container>
            <AnimatedLinearGradient
              customColors={[
                `${backgroundColors.first}`,
                `${backgroundColors.second}`,
                `${backgroundColors.third}`
              ]}
              speed={5000}
            />

            <Content>
              <ScrollView>
                <List
                  dataArray={medicine}
                  renderRow={item => (
                    <ListItem
                      style={{ height: 100 }}
                      onPress={() => {
                        this.props
                          .editMedicine(item.id)
                          .then(() => navigation.navigate("Profile"));
                      }}
                    >
                      <Thumbnail
                        square
                        size={120}
                        source={{ uri: item.image }}
                      />
                      <Body>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text note style={styles.description}>
                          {item.description}
                        </Text>
                      </Body>
                    </ListItem>
                  )}
                />
              </ScrollView>
            </Content>
            <Footer>
              <FooterTab style={styles.footer}>
                <Button
                  onPress={() => navigation.navigate("Colors")}
                  onLongPress={() => {
                    Alert.alert("Colors", "Colors sucessfully removed");
                    this.props.loadingTrue();
                    this.props
                      .deleteColors(this.props.user.id)
                      .then(() => this.props.loadingFalse());
                  }}
                  delayLongPress={3000}
                >
                  <Icon name="format-color-fill" style={styles.footerButton} />
                </Button>
                <Button
                  onPress={() => this.props.navigation.navigate("Create")}
                >
                  <Icon name="plus-box" style={styles.footerButton} />
                </Button>
                <Button
                  onPress={() => navigation.navigate("Interaction")}
                  onLongPress={() => {
                    Alert.alert("Logout", "Logout Sucessful");
                    this.props.loadingTrue();
                    AsyncStorage.setItem("user", "").then(() => {
                      this.props.navigation.navigate("SignUp");
                    });
                  }}
                  delayLongPress={3000}
                >
                  <Icon name="link-variant" style={styles.footerButton} />
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  retrieveMedicine,
  editMedicine,
  deleteMedicine,
  getColors,
  resetActiveMedicine,
  deleteColors,
  getUserById,
  loadingFalse,
  loadingTrue
})(Home);

// MENU BUTTONS STYLE

/* <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <AnimatedLinearGradient
          customColors={[
            `${backgroundColors.first}`,
            `${backgroundColors.second}`,
            `${backgroundColors.third}`
          ]}
          speed={5000}
        />
        <Button
          raised
          buttonStyle={{
            backgroundColor: `${backgroundColors.button}`
          }}
          title="Create New"
          onPress={() => navigation.navigate("Create")}
        />
        <ScrollView>
          {medicine.map(({ name, image, description, id }, i) => (
            <Card
              containerStyle={{
                backgroundColor: `${backgroundColors.card}`
              }}
              title={name}
              titleStyle={{
                fontSize: 30,
                color: `${backgroundColors.textcolor}`
              }}
              image={{ uri: image }}
              imageStyle={{ height: 300 }}
              key={id}
              editable={true}
            >
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 20,
                  color: `${backgroundColors.textcolor}`,
                  marginLeft: 15
                }}
              >
                {description}
              </Text>

              <Button
                small
                title={"Set Alarm"}
                buttonStyle={{
                  width: 200,
                  backgroundColor: `${backgroundColors.button}`
                }}
                textStyle={{ fontSize: 15, letterSpacing: 10 }}
                onPress={() => {
                  this.props
                    .editMedicine(id)
                    .then(() => navigation.navigate("Profile"));
                }}
              />
              <Button
                small
                title={"Delete"}
                buttonStyle={{
                  width: 200,
                  backgroundColor: `${backgroundColors.button}`,
                  marginTop: 20
                }}
                textStyle={{ fontSize: 15, letterSpacing: 10 }}
                onPress={() => {
                  this.props
                    .deleteMedicine(id, this.props.user.id)
                    .then(() =>
                      this.props.retrieveMedicine(this.props.user.id)
                    );
                  Alert.alert("Medicine", "Medicine sucessfully removed");
                }}
              />
            </Card>
          ))}
        </ScrollView> */
/* MENU BUTTONS! */
/* <ActionButton
          buttonColor={`${backgroundColors.button}`}
          active={true}
          style={{ marginLeft: 10 }}
          position={"right"}
          autoInactive={true}
        >
          <ActionButton.Item
            buttonColor={`${backgroundColors.button}`}
            onPress={() => navigation.navigate("Interaction")}
          >
            <Icon name="link-variant" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={`${backgroundColors.button}`}
            onPress={() => navigation.navigate("Colors")}
          >
            <Icon name="palette" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton> */
/* </View> */
