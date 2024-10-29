// PopularMovies.js
import { View, Text, Dimensions, Image, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPopularMovies } from '../Api'; 

const { width, height } = Dimensions.get('window');

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error('Error loading popular movies:', error);
      }
    };

    loadPopularMovies();
  }, []);

  const handlePress = (movie) => {
    navigation.navigate('MovieScreen', { movieId: movie.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Popular:</Text>
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
    marginTop: 10, 
    padding: 10,
  },
  text: {
    color: 'white',
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