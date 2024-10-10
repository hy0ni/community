import { format } from 'date-fns';
import { ko } from 'date-fns/locale'; // 한국어 로케일 가져오기

function MovieCard({ movie }) {

  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy.MM.dd', { locale: ko });
  };

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{formatReleaseDate(movie.release_date)} 개봉</p>
    </div>
  )
}

export default MovieCard;