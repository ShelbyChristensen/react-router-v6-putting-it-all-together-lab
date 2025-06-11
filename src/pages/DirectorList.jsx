import { useOutletContext, Link } from "react-router-dom"

function DirectorList() {
  const { directors } = useOutletContext()

  return (
    <ul>
      {directors.map((director) => (
        <li key={director.id}>
          <Link to={`/directors/${director.id}`}>{director.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default DirectorList
