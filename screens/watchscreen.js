import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WatchScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>WatchScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});