import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base de la API
const AUTHBASE_URL = 'http://10.51.2.18:8082/auth';
const APIBASE_URL = 'http://10.51.2.18:8082/api/movies';


// Función para iniciar sesión
export const handleLogin = async (username, password) => {
    try {
        const response = await axios.post(`${AUTHBASE_URL}/login`, {
            username,
            password,
        });

        if (response.status === 200) {
            // Guardar el token en el almacenamiento local
            await AsyncStorage.setItem('token', response.data.token);
            // Guardar el userId en el almacenamiento local
            await AsyncStorage.setItem('userId', response.data.userId.toString());
        }

        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Alert.alert('Error', 'Credenciales incorrectas. Inténtalo de nuevo.');
        } else {
            console.error('Error al iniciar sesión:', error);
            Alert.alert('Error', 'No se pudo iniciar sesión. Inténtalo de nuevo.');
        }
        throw error; // Propaga el error para que login.js pueda manejarlo.
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
        return response.data.results; // Retorna la lista de películas
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

// Función para obtener las películas populares
export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`${APIBASE_URL}/popular`);
        return response.data.results; // Retorna la lista de películas populares
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

// Función para obtener las películas mejor rankeadas
export const fetchTopRatedMovies = async () => {
    try {
        const response = await axios.get(`${APIBASE_URL}/top_rated`);
        return response.data.results; // Retorna la lista de películas mejores rankeadas
    } catch (error) {
        console.error('Error fetching Top Rated Movies movies:', error);
        throw error;
    }

};

// Función para obtener los detalles de una película
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${APIBASE_URL}/screen/${movieId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

// Función para buscar películas en el buscador
export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${APIBASE_URL}/search/${query}`);
        return response.data.results; // Retorna la lista de películas que coinciden con la búsqueda
    } catch (error) {
        console.error('Error fetching search movies:', error);
        throw error;
    }
};


