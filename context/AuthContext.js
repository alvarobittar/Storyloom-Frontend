import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogin } from '../Api'; // Importa la función desde api.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Para almacenar el token

  // Cargar el token al iniciar la aplicación
  useEffect(() => {
    console.log('AuthProvider montado', { isAuthenticated, user, token });
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setIsAuthenticated(true);
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);
  

  const login = async (username, password) => {
    try {
      const response = await handleLogin(username, password);
      setIsAuthenticated(true);
      setUser({ userId: response.data.userId }); // Almacena solo el userId
      setToken(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', response.data.userId.toString()); // Almacena el userId en AsyncStorage si lo necesitas más tarde
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  };
  

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token'); // Elimina el token del almacenamiento
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
