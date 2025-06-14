import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

function DirectorForm() {
  const [name, setName] = useState('');
  const { addDirector } = useOutletContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newDirector = { name, movies: [] };

    fetch('http://localhost:3000/directors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDirector),
    })
      .then((r) => r.json())
      .then((savedDirector) => {
        addDirector(savedDirector);
        navigate(`/directors/${savedDirector.id}`);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Director Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Add Director</button>
    </form>
  );
}

export default DirectorForm;
