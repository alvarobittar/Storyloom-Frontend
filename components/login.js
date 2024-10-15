import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { handleLogin } from '../Api';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in both username and password");
      return;
    }
  
    try {
      const result = await handleLogin(username, password);
      if (result.status === 200) {
        Alert.alert("Success", "Logged in successfully");
        // Aquí podrías redirigir al usuario o realizar otra acción.
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={onLoginPress} />
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
