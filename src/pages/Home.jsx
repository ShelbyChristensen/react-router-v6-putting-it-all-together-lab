import NavBar from "../components/NavBar"

function Home() {
  return (
    <>
      
      <main>
        <h1>🎬 Welcome to the Movie Directory 🎥</h1>
        <p>
          Explore a collection of famous directors and their iconic movies. Click
          below to start exploring!
        </p>
        <nav>
          {/* add links for directors page and about page */}
          <a>View Directors</a> |{" "}
          <a>Learn More About This App</a>
        </nav>
      </main>
    </>
  )
}

export default Home
