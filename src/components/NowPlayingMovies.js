import { useEffect, useState } from 'react';
import { fetchNowPlayingMovies } from '../api';
import MovieCard from './MovieCard';

function NowPlayingMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');
  const [error, setError] = useState(null);

  const getNowPlayingMovies = async (page) => {
    try {
      const data = await fetchNowPlayingMovies('ko-KR', page);
      // const sortedMovies = data.sort((a, b) => b.vote_average - a.vote_average);
      setMovies(data);
      console.log(data);
    } catch (error) {
      setError('현재 상영중인 영화를 로드하는데 실패했습니다.')
    }
  }

  useEffect(() => {
    getNowPlayingMovies(page);
  }, [page])


  // 인기 순 정렬
  const sortByPopularity = (movies) => {
    return movies.sort((a, b) => b.popularity - a.popularity);
  };

  // 평점 순 정렬
  const sortByVoteAverage = (movies) => {
    return movies.sort((a, b) => b.vote_average - a.vote_average);
  };

  const sortedMovies = sortBy === 'popularity' ? sortByPopularity(movies) : sortByVoteAverage(movies);

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>현재 상영 중인 영화</h2>
      <ul className='movie-list'>
        {sortedMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className='sorted-wrap'>
        <select onChange={(e) => setSortBy(e.target.value)} defaultValue="popularity">
          <option value="popularity">인기순</option>
          <option value="vote_average">평점순</option>
        </select>
      </div>
      <div className='pagination'>
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
          이전 페이지
        </button>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>
          다음 페이지
        </button>
      </div>
    </div>
  )
}
export default NowPlayingMovies;