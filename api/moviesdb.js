import axios from "axios";
import { API_KEY } from "../config";

//endpoints
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "24e5da12e0119037a26a11a43398e94a";

const TRENDINGMOVIESendpoints = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const POPULARMOVIESendpoints = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const TOPRATEDMOVIESendpoints = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
const UPCOMINGMOVIESendpoints = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`;

const apicall = async (endpoints, params) => {
    const options = {
        method: "GET",
        url: endpoints,
        params: params? params : {},
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchTrendingMovies = async () => {
    return await apicall(TRENDINGMOVIESendpoints);
}

export const fetchUpcomingMovies = async () => {
    return await apicall(UPCOMINGMOVIESendpoints);
}

export const fetchTopRateMovies = async () => {
    return await apicall(TOPRATEDMOVIESendpoints);
}

export const fetchPopularMovies = async () => {
    return await apicall(POPULARMOVIESendpoints);
}