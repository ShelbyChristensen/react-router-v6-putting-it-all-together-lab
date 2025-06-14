import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function DirectorList() {
  const { directors } = useOutletContext();

  return (
    <div>
      <h2>All Directors</h2>
      <ul>
        {directors.map((d) => (
          <li key={d.id}>
            <Link to="/directors/new">Add a New Director</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DirectorList;
