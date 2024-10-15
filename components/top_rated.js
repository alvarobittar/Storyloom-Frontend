import { View, Text, Dimensions, Image, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchTopRatedMovies } from '../Api'; // Importa la función desde api.js

const { width, height } = Dimensions.get('window');

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadTopRatedMovies = async () => {
      try {
        const TopRatedMovies = await fetchTopRatedMovies();
        setMovies(TopRatedMovies);
      } catch (error) {
        console.error('Error loading Top Rated movies:', error);
      }
    };

    loadTopRatedMovies();
  }, []);

  const handlePress = (movie) => {
    navigation.navigate('MovieScreen', { movieId: movie.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Rated:</Text>
      <FlatList
        data={movies}
        horizontal
        renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => handlePress(item)}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.image}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
    container: {
        marginBottom: 0, // Ajusta según sea necesario
        padding: 10,
    },

    text: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,  
  },

  listContainer: {
    paddingHorizontal: 10,
  },


  imageContainer: {
    marginRight: 10,
  },
  textMovie: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 10,
  },
});