import React from "react";
import { View, ScrollView } from "react-native";
import { Card, Button, Text } from "react-native-elements";

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <ScrollView>
      <Card title="Alarm">
        <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
        <Button
          backgroundColor="#03A9F4"
          title="SIGN OUT"
          onPress={() => navigation.navigate("SignedOut")}
        />
      </Card>
    </ScrollView>
  </View>
);
