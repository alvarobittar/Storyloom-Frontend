import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Asegúrate de que esta ruta sea correcta
export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.input} placeholder="Nombre de usuario" placeholderTextColor="gray" />
      <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" placeholderTextColor="gray"  />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry placeholderTextColor="gray"/>
      <Button title="Registrarse" onPress={() => {}} />
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
    width: "100%",
    height: "100%",
    
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
});