import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TrendingMovies from '../components/trendingmovies';
import PopularMovies from '../components/popularmovies';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView}contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <TrendingMovies/>
        <PopularMovies/>
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
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 350,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});