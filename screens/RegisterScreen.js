import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Register from '../components/register';
import Login from '../components/login';

export default function RegisterScreen() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <View style={styles.container}>
      {isRegister ? <Register /> : <Login />}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
        </Text>
        <Button
          title={isRegister ? 'Iniciar sesión' : 'Registrarse'} onPress={() => setIsRegister(!isRegister)} color="#9370DB"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  switchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: 'white',
    marginBottom: 10,
  },
});