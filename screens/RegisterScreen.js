import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Register from '../components/register';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Register style={styles.register} />
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