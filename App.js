import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

const PlaceholderImage = require("./assets/images/fondomain.jpg");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Registrarse" />
        <Button label="Iniciar Sesion" />
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "upper",
    justifyContent: "upper",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 100,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "upper",
  },
});
