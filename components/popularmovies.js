import { View, Text, Dimensions, Image, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function PopularMovies() {
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

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));
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
    marginBottom: -150,
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