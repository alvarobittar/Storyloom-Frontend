import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { fetchMovieDetails, addToWatchList, addToSeenList, removeMovie } from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieScreen({ route }) {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const movieData = await fetchMovieDetails(movieId);
                setMovie(movieData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
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

const imdbUrl = `https://www.imdb.com/title/${movie.imdb_id}`;
const trailerUrl = `https://www.youtube.com/watch?v=${movie.trailer}`;



const handleAddToWatchList = async () => {
  try {
    const userId = await AsyncStorage.getItem('@user_Id'); // Corregido para usar la clave correcta
    if (!userId) {
        throw new Error('Usuario no encontrado');
    }
    await addToWatchList(userId, movieId);
    Alert.alert("Success", `${movie.title} marked as watchlist`);
} catch (error) {
    console.error('Error adding to watchlist :', error);
    Alert.alert("Error", "Could not mark as Seen");
}
};

const handleAddToSeenList = async () => {
  try {
      const userId = await AsyncStorage.getItem('@user_Id'); // Corregido para usar la clave correcta
      if (!userId) {
          throw new Error('Usuario no encontrado');
      }
      await addToSeenList(userId, movieId);
      Alert.alert("Success", `${movie.title} marked as Seen`);
  } catch (error) {
      console.error('Error adding to Seen list:', error);
      Alert.alert("Error", "Could not mark as Seen");
  }
};

const handleRemoveMovie = async () => {
  try {
      const userId = await AsyncStorage.getItem('@user_Id');
      if (!userId) {
          Alert.alert('Error', 'Usuario no encontrado');
          return;
      }
      await removeMovie(userId, movieId);
      Alert.alert('Éxito', 'Película eliminada de ambas listas.');
  } catch (error) {
      console.error('Error al eliminar la película:', error);
      Alert.alert('Error', 'No se pudo eliminar la película. Inténtalo de nuevo.');
  }
};


return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.movieContainer}>
            {/* Imagen de la película */}
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
            
            {/* Contenedor de título, director y tiempo */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.director}>Directed by</Text>
                <Text style={styles.directorName}>{movie.director}</Text>
                <Text style={styles.runtime}>{movie.runtime} mins</Text>

                {/* Contenedor de los botones en horizontal */}
                <View style={styles.horizontalButtonContainer}>
                    <TouchableOpacity style={styles.heartButton} onPress={handleAddToWatchList}>
                        <Image source={require('../assets/images/favorite_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png')} style={styles.heartIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemoveMovie}>
                        <Image source={require('../assets/images/disabled_by_default_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png')} style={styles.removeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tickButton} onPress={handleAddToSeenList}>
                        <Image source={require('../assets/images/dobletick.png')} style={styles.tickIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>


        {/* Descripción/Biografía */}
        <Text style={styles.description}>{movie.overview}</Text>

        {/* Botones de Tráiler e IMDb */}
        <View style={styles.linkButtonContainer}>
            {movie.trailer && (
                <TouchableOpacity onPress={() => Linking.openURL(trailerUrl)} style={styles.trailerButton}>
                    <Text style={styles.trailerText}>Tráiler</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => Linking.openURL(imdbUrl)} style={styles.imdbButton}>
                <Text style={styles.imdbText}>IMDb</Text>
            </TouchableOpacity>
        </View>

        {/*Elenco*/}
        <Text style={styles.castTitle}>Cast</Text>
        <ScrollView horizontal={true} style={styles.castScrollContainer} showsHorizontalScrollIndicator={false}>
            <View style={styles.castContainer}>
                {movie.cast.map((actor, index) => (
                    <View key={index} style={styles.actorContainer}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}` }}
                            style={styles.actorImage}
                        />
                        <Text style={styles.actorName}>{actor.name}</Text>
                        <Text style={styles.actorCharacter}>{actor.character}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>

        {/* Imágenes de la película */}
        <Text style={styles.imagesTitle}>Imágenes</Text>
        <ScrollView horizontal={true} style={styles.imagesScrollContainer} showsHorizontalScrollIndicator={false}>
            <View style={styles.imagesContainer}>
                {movie.images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
                        style={styles.imageThumbnail}
                    />
                ))}
            </View>
        </ScrollView>
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
  movieContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27,
  },
  heartButton: {
    marginRight: 15,
  },
  removeButton: {
    marginRight: 15,
  },
  tickButton: {
    marginRight: 15,
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
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  director: {
    color: '#aaaaaa',
    fontSize: 16,
    marginTop: 5,
  },
  directorName: {
    color: 'white',
  },
  runtime: {
    color: '#aaaaaa',
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginVertical: 18,
  },
  linkButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  trailerButton: {
    backgroundColor: '#9370DB',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  trailerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imdbButton: {
    backgroundColor: '#f5c518',
    padding: 15,
    borderRadius: 5,
  },
  imdbText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  castTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  castScrollContainer: {
    marginVertical: 10,
  },
  castContainer: {
    flexDirection: 'row',
  },
  actorContainer: {
    width: 100,
    alignItems: 'center',
    marginRight: 20,
  },
  actorImage: {
    width: 100, // Aumenta el ancho
    height: 100, // Aumenta la altura para que coincida con el ancho
    borderColor: '#9370DB',
    borderWidth: 1,
    borderRadius: 75,
  },
  actorName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  actorCharacter: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
  },
  imagesTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  imagesScrollContainer: {
    marginVertical: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  imageThumbnail: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 8,
  },
});
