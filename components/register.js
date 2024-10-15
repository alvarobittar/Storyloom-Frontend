import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../Api'; // Asegúrate de que esta ruta sea correcta

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = async () => {
    try {
      const response = await registerUser(username, email, password);
      // Maneja la respuesta aquí (por ejemplo, muestra un mensaje de éxito o redirige al usuario)
      if (response.status === 200) {
        Alert.alert('Registro exitoso', '¡Usuario registrado con éxito!');
      }
    } catch (error) {
      // Maneja el error aquí (por ejemplo, muestra un mensaje de error)
      Alert.alert('Error', 'No se pudo registrar el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="gray" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        placeholderTextColor="gray" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        placeholderTextColor="gray" 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Register" onPress={handleRegisterClick} style={styles.Button}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 150,
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'white',
    width: '80%',
    textAlign: 'center',
  },
  Button: {
    backgroundColor: '#9370DB',
    width: '80%',
  },
});
