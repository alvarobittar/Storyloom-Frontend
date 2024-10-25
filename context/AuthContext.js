// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            const userId = await AsyncStorage.getItem('@user_Id');
            const token = await AsyncStorage.getItem('@jwt_token');
            if (userId && token) {
                setUser({ userId, token });
            }
            setLoading(false);
        };

        loadUserData();
    }, []);

    const login = async (username, password) => {
        // Llama a la función de login y guarda los datos en el estado y AsyncStorage
        const response = await handleLogin(username, password);
        const userId = response.data.userId;
        const token = response.data.token;
        setUser({ userId, token });
        await AsyncStorage.setItem('@user_Id', userId.toString());
        await AsyncStorage.setItem('@jwt_token', token);
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('@user_Id');
        await AsyncStorage.removeItem('@jwt_token');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};