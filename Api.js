import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


// URL base de la API
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
            // Guardar el token en el almacenamiento local
            const token =  response.data.token; 
            await AsyncStorage.setItem('@jwt_token', token);
            // Guardar el userId en el almacenamiento local
            const userId = response.data.userId;
            await AsyncStorage.setItem('@user_Id', userId.toString());
        }
        console.log('Response:', response.data);
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


// Función para agregar una película a la watchlist
export const addToWatchList = async (userId, movieId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        const response = await axios.post(
            `${APILIST_URL}/add?userId=${userId}&movieId=${movieId}&status=WATCHLIST`, // Usar la ruta correcta para agregar
            {}, // Enviar el cuerpo vacío ya que los parámetros van en la URL
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response;
    } catch (error) {
        console.error('Error adding to Watchlist:', error);
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

        const response = await axios.post(
            `${APILIST_URL}/add?userId=${userId}&movieId=${movieId}&status=SEEN`, 
            {}, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            }
        );
        return response;
    } catch (error) {
        console.error('Error adding to Seen list:', error);
        throw error;
    }
};


// Función para eliminar una película de la watchlist
export const removeFromWatchList = async (userId, movieId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        const response = await axios.delete(
            `${APILIST_URL}/user/${userId}'/remove?userId=${userId}&movieId=${movieId}`, // Usar la ruta correcta
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response;
    } catch (error) {
        console.error('Error removing from Watchlist:', error);
        throw error;
    }
};

// Función para obtener la watchlist por ID de usuario
export const fetchWatchlist = async (userId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        const response = await axios.get(
            `${APILIST_URL}/user/${userId}/watchlist`, // Ruta correcta para obtener la watchlist
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        throw error;
    }
};

// Función para obtener la lista de películas vistas por ID de usuario
export const fetchSeenMovies = async (userId) => {
    try {
        const token = await AsyncStorage.getItem('@jwt_token');
        const response = await axios.get(
            `${APILIST_URL}/user/${userId}/seen`, // Ruta correcta para obtener películas vistas
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching seen movies:', error);
        throw error;
    }
};







