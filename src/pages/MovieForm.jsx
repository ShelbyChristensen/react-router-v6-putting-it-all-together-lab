import { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

function MovieForm() {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const director = useOutletContext();

  function handleSubmit(e) {
    e.preventDefault();
    const newMovie = { title, directorId: parseInt(id) };

    fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie),
    })
      .then((r) => r.json())
      .then((savedMovie) => {
        navigate(`/directors/${id}/movies/${savedMovie.id}`);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Movie Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default MovieForm;
