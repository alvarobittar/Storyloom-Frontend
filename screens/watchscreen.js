import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWatchlist, fetchSeenMovies } from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieList from '../components/movielist';

export default function WatchScreen() {
    const [seenList, setSeenList] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showingWatchlist, setShowingWatchlist] = useState(true);

    const navigation = useNavigation();

    const fetchMovieLists = async () => {
        try {
            setLoading(true);
            const userId = await AsyncStorage.getItem('@user_Id');

            const watchListData = await fetchWatchlist(userId);
            setWatchList(watchListData);

            const seenListData = await fetchSeenMovies(userId);
            setSeenList(seenListData);
        } catch (error) {
            console.error('Error fetching movie lists:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchMovieLists();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchMovieLists();
    };

    if (loading && !refreshing) {
        return <ActivityIndicator size="large" color="#FFF" style={styles.loader} />;
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={showingWatchlist ? styles.selectedButton : styles.button}
                    onPress={() => setShowingWatchlist(true)}
                >
                    <Text style={styles.buttonText}>Watchlist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={!showingWatchlist ? styles.selectedButton : styles.button}
                    onPress={() => setShowingWatchlist(false)}
                >
                    <Text style={styles.buttonText}>Seen</Text>
                </TouchableOpacity>
            </View>
            <MovieList navigation={navigation} movies={showingWatchlist ? watchList : seenList} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#121212',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 60,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#333',
        borderWidth: 2,
        borderColor: '#fff',
    },
    selectedButton: {
        paddingVertical: 10, 
        paddingHorizontal: 60, 
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#9370DB',
        borderWidth: 2,
        borderColor: '#fff',
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