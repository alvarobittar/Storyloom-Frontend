import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchMovies } from '../Api'; // Importa la función desde api.js

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const results = await searchMovies(text); // Llama a la función de api.js
        setMovies(results);
      } catch (error) {
        console.error('Error fetching search movies:', error);
      }
    } else {
      setMovies([]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setMovies([]);
  };

  const handlePress = (movie) => {
    navigation.navigate('MovieScreen', { movieId: movie.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Seacrh..."
          placeholderTextColor="gray"
          value={query}
          onChangeText={handleSearch}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.movieItem}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                style={styles.movieImage}
              />
            </View>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'white',
    flex: 1,
  },
  clearButton: {
    marginLeft: 10,
    padding: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 20,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 18,
  },
});
