import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// 공통 인스턴스
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const fetchMovies = async (endpoint, language = 'ko-KR', page = 1) => {
  try {
    const response = await apiClient.get(endpoint, {
      params: { language, page },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 현재 상영중인 영화 목록
export const fetchNowPlayingMovies = (language, page) => fetchMovies('movie/now_playing', language, page);

// 인기 있는 영화 목록
export const fetchPopularMovies = (language, page) => fetchMovies('movie/popular', language, page);

// 개봉 예정 영화 목록
export const fetchUpcomingMovies = (language, page) => fetchMovies('movie/upcoming', language, page);
