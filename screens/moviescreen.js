import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { fetchMovieDetails } from '../Api'; 
import { WatchListContext } from '../components/WatchListContext';

export default function MovieScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToWatchList, addToSeenList, removeFromWatchList, removeFromSeenList } = useContext(WatchListContext);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details movies:', error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const handleAddToSeenList = () => {
    addToSeenList(movie);
  };

  const handleAddToWatchList = () => {
    addToWatchList(movie);
  };


  const handleRemoveFromWatchList = () => {
    removeFromWatchList(movie);
    removeFromSeenList(movie);
  };





  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.heartButton} onPress={handleAddToWatchList}>
        <Image source={require('../assets/images/favorite_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png')} style={styles.heartIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveFromWatchList}>
        <Image source={require('../assets/images/disabled_by_default_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png')} style={styles.removeIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tickButton} onPress={handleAddToSeenList}>
        <Image source={require('../assets/images/dobletick.png')} style={styles.tickIcon} />
      </TouchableOpacity>
    </View>
    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
    <Text style={styles.title}>{movie.title}</Text>
    <Text style={styles.description}>{movie.overview}</Text>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  heartButton: {
    marginRight: 100,
  },
  removeButton: {
    marginHorizontal: 10,
  },
  tickButton: {
    marginLeft: 100,
  },
  heartIcon: {
    width: 40,
    height: 40,
  },
  tickIcon: {
    width: 40,
    height: 40,
  },
  removeIcon: {
    width: 40,
    height: 40,
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

