import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WatchListContext } from '../components/WatchListContext';

export default function WatchScreen() {
  const { watchList, seenList } = useContext(WatchListContext); // 'seenList' para las películas ya vistas
  const [showWatchList, setShowWatchList] = useState(true); // Controla qué lista mostrar
  const navigation = useNavigation(); // Hook para la navegación

  // Alternar entre las listas de "Por ver" y "Vistas"
  const handleToggleList = () => {
    setShowWatchList(!showWatchList);
  };

  // Función para manejar la navegación a la pantalla de detalles de la película
  const handlePress = (movie) => {
    navigation.navigate('MovieScreen', { movieId: movie.id });
  };

  // Función para renderizar una lista de películas
  const renderMovieList = (list) => (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id.toString()}
      numColumns={4}
      renderItem={({ item }) => (
        // Hacer que cada película sea presionable
        <TouchableWithoutFeedback onPress={() => handlePress(item)}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Botones para alternar entre las listas */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, showWatchList ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setShowWatchList(true)}
        >
          <Text style={styles.buttonText}>For Viewing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !showWatchList ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setShowWatchList(false)}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
      {/* Renderizar la lista de películas según el estado */}
      {showWatchList ? renderMovieList(watchList) : renderMovieList(seenList)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 55,
    borderRadius: 5,
    borderWidth: 2, 
    borderColor: 'white', 
  },
  activeButton: {
    backgroundColor: '#9370DB',
  },
  inactiveButton: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 95,
    height: 150,
    borderRadius: 10,
  },
});
