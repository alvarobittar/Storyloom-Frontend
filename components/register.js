import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../Api';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegisterClick = async () => {
    try {
      const response = await registerUser(username, email, password);
      if (response.status === 200) {
        Alert.alert('Successful registration', 'User registered successfully!');
        navigation.replace('Login'); 
      }
    } catch (error) {
      Alert.alert('Error', 'Could not register the user. Please try again.');
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
      <Button title="Register" onPress={handleRegisterClick} style={styles.Button} color="#9370DB" />
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