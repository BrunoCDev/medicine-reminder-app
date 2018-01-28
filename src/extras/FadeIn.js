import React from "react";
import { Animated, Text, View, ScrollView } from "react-native";

export default class FadeIn extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 10000 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
        ])}
      />
    );
  }
}
