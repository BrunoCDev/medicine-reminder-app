import React from "react";
import { View, ActivityIndicator } from "react-native";

export const Loading = () => (
  <View style={{ flex: 1 }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
