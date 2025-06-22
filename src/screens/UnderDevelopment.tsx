import React from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ViewStyle,
  TextStyle,
} from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../theme/colors";

const { width } = Dimensions.get("window");

export default function UnderDevelopment() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background.secondary}
      />
      <LottieView
        source={require("../../assets/animations/underDevelopment.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>This screen is under development</Text>
      <Text style={styles.subtitle}>Check back soon!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background.opaqueGreen,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  lottie: {
    height: width * 0.8,
    marginLeft: 64,
    width: width * 0.8,
  },
  subtitle: {
    color: colors.text.lightGreen,
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    color: colors.text.green,
    fontFamily: "AvenirMedium",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    textAlign: "center",
  },
});

type Styles = {
  container: ViewStyle;
  lottie: ViewStyle;
  subtitle: TextStyle;
  title: TextStyle;
};
