import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TrendingMovies from '../components/trendingmovies';
import PopularMovies from '../components/popularmovies';
import TopRatedMovies from '../components/top_rated';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView}contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <TrendingMovies/>
        <PopularMovies/>
        <TopRatedMovies/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    paddingTop: 25, // Ajusta este valor según sea necesario
  },
  container: {
    flex: 1,
     // Alinea desde arriba
    
    paddingVertical: 0, // Elimina el padding vertical
  },
});