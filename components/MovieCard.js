import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MovieCard({ posterPath, title }) {
   
    return (
        <View style={styles.movieItem}>
            {posterPath ? (
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
                    style={styles.image}
                />
            ) : (
                <View style={[styles.image, styles.imagePlaceholder]}>
                    <Text style={styles.noImageText}>No imagen</Text>
                </View>
            )}
            <View style={styles.info}>
                <Text style={styles.title}>{title || "Sin Título"}</Text>

            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    movieItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#1a1a1a',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 150,
        marginRight: 10,
        borderRadius: 5,
    },
    imagePlaceholder: {
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImageText: {
        color: '#ccc',
        textAlign: 'center',
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#ccc',
    },
});