import { format } from 'date-fns';
import { ko } from 'date-fns/locale'; // 한국어 로케일 가져오기

function MovieCard({ movie }) {

  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM dd일 yyyy년', { locale: ko });
  };

  return (
    <li className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>개봉일: {formatReleaseDate(movie.release_date)}</p>
    </li>
  )
}

export default MovieCard;