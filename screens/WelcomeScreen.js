import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Register');
    }, 7000); // Navega a la pantalla principal después de 7 segundos

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../assets/images/StoryloomLogoV.png')} 
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]} 
        resizeMode="contain" // Ajusta la imagen para que se contenga dentro del contenedor
      />
      <ActivityIndicator size="large" color="white" style={styles.loadingIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '80%', 
    height: undefined, 
    aspectRatio: 1, 
    marginBottom: 50,
  },
  loadingIndicator: {
    marginTop: 0,
  },
});