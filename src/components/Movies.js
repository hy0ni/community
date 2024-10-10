import { useEffect, useState } from "react";
import { fetchNowPlayingMovies, fetchPopularMovies, fetchUpcomingMovies } from "../api";
import MovieCard from "./MovieCard";

function Movies() {
  const [activeTab, setActiveTab] = useState('popular');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const getMovies = async (tab) => {
    let data;
    try {
      if (tab === 'popular') {
        data = await fetchPopularMovies();
      } else if (tab === 'nowPlaying') {
        data = await fetchNowPlayingMovies();
      } else if (tab === 'upcoming') {
        data = await fetchUpcomingMovies();
      }
      setMovies(data);
    } catch (error) {
      setError('영화를 로드하는 데 실패했습니다.');
    }
  }

  useEffect(() => {
    getMovies(activeTab);
  }, [activeTab]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div className="tab-menu">
        <button onClick={() => setActiveTab('popular')} className={activeTab === 'popular' ? 'active' : ''}>
          인기 영화
        </button>
        <button onClick={() => setActiveTab('nowPlaying')} className={activeTab === 'nowPlaying' ? 'active' : ''}>
          현재 상영 중인 영화
        </button>
        <button onClick={() => setActiveTab('upcoming')} className={activeTab === 'upcoming' ? 'active' : ''}>
          개봉 예정 영화
        </button>
      </div>
      <ul className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className='pagination'>
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
          이전 페이지
        </button>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>
          다음 페이지
        </button>
      </div>
    </div>
  );
}
export default Movies;