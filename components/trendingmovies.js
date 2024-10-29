import { View, Text, Dimensions, Image, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies } from '../Api'; 

const { width, height } = Dimensions.get('window');

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const TrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error('Error loading trending movies:', error);
      }
    };

    TrendingMovies();
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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, 
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
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