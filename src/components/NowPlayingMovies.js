import { useEffect, useState } from 'react';
import { fetchNowPlayingMovies } from '../api';
import MovieCard from './MovieCard';

function NowPlayingMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 번호 상태 관리
  const [error, setError] = useState(null);

  const getNowPlayingMovies = async (page) => {
    try {
      const data = await fetchNowPlayingMovies('ko-KR', page);
      const sortedMovies = data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      setMovies(sortedMovies);
    } catch (error) {
      setError('현재 상영중인 영화를 로드하는데 실패했습니다.')
    }
  }

  useEffect(() => {
    getNowPlayingMovies(page);
  }, [page])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>현재 상영 중인 영화</h2>
      <ul className='movie-list'>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className='btn-wrap'>
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>이전 페이지</button>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>
          다음 페이지
        </button>
      </div>
    </div>
  )
}
export default NowPlayingMovies;