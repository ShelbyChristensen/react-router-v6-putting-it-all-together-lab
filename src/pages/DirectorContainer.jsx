import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function DirectorContainer() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/directors')
      .then((r) => r.json())
      .then(setDirectors);
  }, []);

  const addDirector = (newDirector) => {
    setDirectors((prev) => [...prev, newDirector]);
  };

  const updateDirector = (updatedDirector) => {
    setDirectors((prev) =>
      prev.map((d) => (d.id === updatedDirector.id ? updatedDirector : d))
    );
  };

  return (
    <div>
      <h1>Directors</h1>
      <Outlet context={{ directors, addDirector, updateDirector }} />
    </div>
  );
}

export default DirectorContainer;
