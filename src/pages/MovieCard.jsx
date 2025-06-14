import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function MovieCard() {
  const { movieId } = useParams();
const director = useOutletContext();

const movie = director?.movies?.find((m) => m.id === movieId);

if (!movie) return <p>Movie not found.</p>; // handles invalid movieId

return (
  <div>
    <h3>{movie.title}</h3>
    <p>Time: {movie.time} minutes</p>
    <p>Genres: {movie.genres.join(', ')}</p>
  </div>
);

}

export default MovieCard;
