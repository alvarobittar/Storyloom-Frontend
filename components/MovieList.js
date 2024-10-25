import React from 'react';
import { View, StyleSheet, TouchableOpacity, RefreshControl, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MovieCard from './MovieCard';

const MovieList = ({ navigation, movies }) => {
    return (
        <View style={styles.listContainer}>
            {movies.length === 0 ? (
                <Text style={styles.emptyText}>No hay películas en esta lista.</Text>
            ) : (
                <FlashList
                    data={movies}
                    contentContainerStyle={styles.flashListContent}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('MovieScreen', { movieId: item.movieId })}>
                            <MovieCard {...item} />
                        </TouchableOpacity>
                    )}
                    estimatedItemSize={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {}}
                            tintColor="#FFF"
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1a1a1a',
        padding: 10,
    },
    flashListContent: {
        paddingVertical: 5,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
});

export default MovieList;