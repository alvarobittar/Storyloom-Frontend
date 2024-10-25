import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWatchlist, fetchSeenMovies } from '../Api'; // Importar las funciones adecuadas
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieList from '../components/MovieList';

export default function WatchScreen() {
    const [watchList, setWatchList] = useState([]);
    const [seenList, setSeenList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showingWatchlist, setShowingWatchlist] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchMovieLists = async () => {
            try {
                setLoading(true);
                const userId = await AsyncStorage.getItem('@user_Id'); // Obtener userId del almacenamiento

                // Obtener la lista de películas por ver
                const watchListData = await fetchWatchlist(userId);
                setWatchList(watchListData);

                // Obtener la lista de películas vistas
                const seenListData = await fetchSeenMovies(userId);
                setSeenList(seenListData);
            } catch (error) {
                console.error('Error fetching movie lists:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieLists();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#FFF" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={() => setShowingWatchlist(true)}>
                    <View style={showingWatchlist ? styles.selectedButton : styles.button}>
                        <Text style={styles.buttonText}>Watchlist</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setShowingWatchlist(false)}>
                    <View style={!showingWatchlist ? styles.selectedButton : styles.button}>
                        <Text style={styles.buttonText}>Seen</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {/* Pasamos la lista correcta a MovieList en función de showingWatchlist */}
            <MovieList
                navigation={navigation}
                movies={showingWatchlist ? watchList : seenList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#333',
    },
    selectedButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#1a73e8',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
