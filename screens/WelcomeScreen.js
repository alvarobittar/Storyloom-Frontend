import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 7000); // Navega a la pantalla principal después de 7 segundos

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/Storyloom-logo.png')} 
        style={styles.image} 
      />
      <Text style={styles.welcomeText}>LOADING...</Text>
      <Image 
        source={require('../assets/images/icons8-cargando.gif')} // Ruta al archivo GIF local
        style={styles.loadingGif} 
      />
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
  welcomeText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  loadingGif: {
    width: 50,
    height: 50,
  },
});