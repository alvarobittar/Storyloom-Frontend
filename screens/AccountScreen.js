import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Register from '../components/register';
import Login from '../components/login';

export default function AccountScreen({ navigation }) {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <View style={styles.container}>
      {isRegister ? <Register navigation={navigation} /> : <Login navigation={navigation} />}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isRegister ? '¿Do you already have an account?' : '¿Dont have an account?'}
        </Text>
        <Button
          title={isRegister ? 'Log In' : 'Register'} onPress={() => setIsRegister(!isRegister)} color="#9370DB"/>
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