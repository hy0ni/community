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

// 현재 상영중인 영화 목록
export const fetchNowPlayingMovies = async (language = 'ko-KR', page = 1) => {
  try {
    const response = await apiClient.get('movie/now_playing', {
      params: { language, page },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 인기 있는 영화 목록
export const fetchPopularMovies = async (language = 'ko-KR', page = 1) => {
  try {
    const response = await apiClient.get('movie/popular', {
      params: { language, page },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 개봉 예정 영화 목록
export const fetchUpcomingMovies = async (language = 'ko-KR', page = 1) => {
  try {
    const response = await apiClient.get('movie/upcoming', {
      params: { language, page },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}