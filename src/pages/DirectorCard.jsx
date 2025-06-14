import { useParams, Outlet, useOutletContext } from 'react-router-dom';

function DirectorCard() {
  const { id } = useParams();
  const { directors } = useOutletContext();

  const director = directors.find((d) => d.id === id); 

  if (!director) return <p>Director not found.</p>;

  return (
    <div>
      <h2>{director.name}</h2>
      <p>{director.bio}</p>

      <h3>Movies:</h3>
      <ul>
        {director.movies.map((movie) => (
          <li key={movie.id}>
            <a href={`movies/${movie.id}`}>{movie.title}</a>
          </li>
        ))}
      </ul>

      <Outlet context={director} />
    </div>
  );
}

export default DirectorCard;
