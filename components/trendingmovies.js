import { View, Text, Dimensions, Image, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGU1ZGExMmUwMTE5MDM3YTI2YTExYTQzMzk4ZTk0YSIsIm5iZiI6MTcyNTc1MDQzMi4xNjg2MTUsInN1YiI6IjY2ZGNiYjI5M2M1NThiNWU2YWVlMmIxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._vN8AzKKQr7yWxku4aRzr0p-pLFGT6cfM5twD07u_jg'
      }
    };

    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));
  }, []);

  const handlePress = (movie) => {
    navigation.navigate('MovieScreen', { movieId: movie.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending right now:</Text>
      <FlatList
        data={movies}
        horizontal
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handlePress(item)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
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
    marginTop: 20,
    paddingHorizontal: 10,
  },
  text: {
    color: 'yellow',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    transform: [{ perspective: 1000 }, { rotateY: '-10deg' }], // Efecto 3D
  },
  image: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 10,
  },
});