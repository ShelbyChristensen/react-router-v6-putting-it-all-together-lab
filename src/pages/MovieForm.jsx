import { useState } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

function MovieForm() {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [genres, setGenres] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()
  const { director } = useOutletContext()

  if (!director) return <h2>Director not found.</h2>

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMovie = {
      id: uuidv4(),
      title,
      time: parseInt(time),
      genres: genres.split(",").map((g) => g.trim())
    }

    fetch(`http://localhost:4000/directors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ movies: [...director.movies, newMovie] })
    })
      .then((r) => r.json())
      .then(() => {
        navigate(`../movies/${newMovie.id}`)
      })
      .catch(console.log)
  }

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Duration" />
        <input value={genres} onChange={(e) => setGenres(e.target.value)} placeholder="Genres" />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  )
}

export default MovieForm
