import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function MovieScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: '24e5da12e0119037a26a11a43398e94a',
            language: 'es-ES',
          },
        });
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.movieImage}
          />
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieOverview}>{movie.overview}</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  movieImage: {
    width: 300,
    height: 450,
    borderRadius: 10,
    marginBottom: 20,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieOverview: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  movieBackdrop: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});