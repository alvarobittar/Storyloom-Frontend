import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


// URL base de la API y de autenticación
const AUTHBASE_URL = 'http://192.168.100.24:8082/auth';
const APIBASE_URL = 'http://192.168.100.24:8082/api/movies';
const APILIST_URL = 'http://192.168.100.24:8082/api/movielist';


// Función para iniciar sesión
export const handleLogin = async (username, password) => {
    try {
        const response = await axios.post(`${AUTHBASE_URL}/login`, {
            username,
            password,
        });

        if (response.status === 200) {
           
            const token =  response.data.token; 
            await AsyncStorage.setItem('@jwt_token', token);
            
            const userId = response.data.userId;
            await AsyncStorage.setItem('@user_Id', userId.toString());
        }
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Alert.alert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
        } else {
            Alert.alert('Error', 'No se pudo iniciar sesión. Inténtalo de nuevo.');
        }
        throw error; 
    }
};

// Función para registrar un usuario
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${AUTHBASE_URL}/register`, {
            username,
            email,
            password,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Función para obtener las películas en tendencia
export const fetchTrendingMovies = async () => {
    try {
        const response = await axios.get(`${APIBASE_URL}/trending`);
        return response.data.results; 
    } catch (error) {
        throw error;
    }
};

// Función para obtener las películas populares
export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`${APIBASE_URL}/popular`);
        return response.data.results; 
    } catch (error) {
        throw error;
    }
};

// Función para obtener las películas mejor rankeadas
export const fetchTopRatedMovies = async () => {
    try {
        const response = await axios.get(`${APIBASE_URL}/top_rated`);
        return response.data.results; 
    } catch (error) {
        throw error;
    }

};

// Función para obtener los detalles de una película
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${APIBASE_URL}/screen/${movieId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para buscar películas en el buscador
export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${APIBASE_URL}/search/${query}`);
        return response.data.results; // Retorna la lista de películas que coinciden con la búsqueda
    } catch (error) {
        throw error;
    }
};


// Función para agregar una película a la watchlist
export const addToWatchList = async (userId, movieId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await axios.post(`${APILIST_URL}/add?userId=${userId}&movieId=${movieId}&status=WATCHLIST`, {

        }, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};


// Función para agregar una película a la lista de vistas
export const addToSeenList = async (userId, movieId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await axios.post(`${APILIST_URL}/add?userId=${userId}&movieId=${movieId}&status=SEEN`, {

        }, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};


// Función para eliminar una película
export const removeMovie = async (userId, movieId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        if (!token) {
            throw new Error('Token no encontrado');
        }
        const response = await axios.delete(`${APILIST_URL}/user/${userId}/remove?movieId=${movieId}`, { 
            headers: { Authorization: `Bearer ${token}` } }
        );
        return response; 
    } catch (error) {
        throw error; 
    }
};



// Función para obtener la watchlist por ID de usuario
export const fetchWatchlist = async (userId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        const response = await axios.get(`${APILIST_URL}/user/${userId}/watchlist`, { 
            headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Función para obtener la lista de películas vistas por ID de usuario
export const fetchSeenMovies = async (userId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        const response = await axios.get(`${APILIST_URL}/user/${userId}/seen`, {
             headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};







