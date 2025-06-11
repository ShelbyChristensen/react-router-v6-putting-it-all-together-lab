import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const DirectorContainer = () => {
  const [directors, setDirectors] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/directors")
      .then(r => r.json())
      .then(setDirectors)
      .catch(console.log)
  }, [])

  return (
    <>
      <NavBar />
      <main>
        <h1>Welcome to the Director's Directory!</h1>
        <Outlet context={{ directors, setDirectors }} />
      </main>
    </>
  )
}

export default DirectorContainer
