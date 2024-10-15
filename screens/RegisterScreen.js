import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Register from '../components/register';
import Login from '../components/login';

export default function RegisterScreen() {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, showRegister ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setShowRegister(true)}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !showRegister ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setShowRegister(false)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      {showRegister ? <Register style={styles.register} /> : <Login style={styles.login} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 65,
    borderRadius: 5,
    borderWidth: 2, 
    borderColor: 'white', 
  },
  activeButton: {
    backgroundColor: '#9370DB',
  },
  inactiveButton: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  register: {
    // Estilos específicos para el componente Register
  },
  login: {
    // Estilos específicos para el componente Login
  },
});