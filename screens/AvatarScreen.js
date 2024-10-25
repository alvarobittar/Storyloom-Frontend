import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image1 from '../assets/images/png-transparent-avatar-face-man-boy-male-profile-smiley-avatar-icon.png';
import image2 from '../assets/images/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png';

export default function AvatarScreen() {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(image1);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }

      const storedImage = await AsyncStorage.getItem('selectedImage');
      if (storedImage) {
        setSelectedImage(JSON.parse(storedImage)); // Convierte la cadena de nuevo a su formato original
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('username'); // Elimina el nombre de usuario almacenado
    await AsyncStorage.removeItem('selectedImage'); // Elimina la imagen seleccionada almacenada
    navigation.replace('Login'); // Navega a la pantalla de inicio de sesión
  };

  const handleImageSelect = async (image) => {
    setSelectedImage(image);
    await AsyncStorage.setItem('selectedImage', JSON.stringify(image)); // Convierte la imagen a una cadena
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSelectorContainer}>
        <TouchableOpacity onPress={() => handleImageSelect(image1)}>
          <Image source={image1} style={styles.selectableImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImageSelect(image2)}>
          <Image source={image2} style={styles.selectableImage} />
        </TouchableOpacity>
      </View>
      <Image source={selectedImage} style={styles.avatar} />
      <Text style={styles.username}>{username}</Text>
      <Button title="Log Out" onPress={handleLogout} color="#9370DB"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  imageSelectorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectableImage: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});