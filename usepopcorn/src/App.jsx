import { useState, useEffect } from "react";
import Rating from "./Components/Rating";
import "./index.css";

const OMDB_BASE_URL = import.meta.env.VITE_OMDB_URL;
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const average = (arr) =>
  Number(arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)).toFixed(
    1
  );

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Hugo");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((movies) => [...movies, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((movies) => movies.filter((m) => m.imdbID !== id));
  };


  // This can now be converted to a eventhandler but we keep like this for learning
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `${OMDB_BASE_URL}?s=${query}&apiKey=${OMDB_API_KEY}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went wrong while fetching");

          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie();
      fetchMovies();
      return () => controller.abort();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isloading ? <Loader /> : <List data={movies} ListItem={MovieListItem} /> } */}
          {isloading && <Loader />}
          {!isloading && !error && (
            <List
              data={movies}
              ListItem={MovieListItem}
              onItemClick={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetailView
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddMovie={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <List
                data={watched}
                ListItem={WatchedListItem}
                onDeleteClick={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function List({ data, ListItem, onItemClick, onDeleteClick }) {
  return (
    <ul className="list list-movies">
      {data.map((movie) => (
        <ListItem
          key={movie.imdbID}
          movie={movie}
          onItemClick={onItemClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </ul>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{`${watched.length} movies`}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedListItem({ movie, onDeleteClick }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteClick(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function MovieListItem({ movie, onItemClick }) {
  return (
    <li onClick={() => onItemClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetailView({ selectedId, onCloseMovie, onAddMovie, watched }) {
  const [movie, setMovie] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const watchedRating = watched.find(
    (m) => m.imdbID === movie.imdbID
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
  } = movie;
  const handleAddMovie = () => {
    onAddMovie({
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: parseInt(runtime),
      imdbRating: +imdbRating,
      userRating,
    });
    onCloseMovie();
  };

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${OMDB_BASE_URL}?i=${selectedId}&apiKey=${OMDB_API_KEY}`
        );
        if (!res?.ok) throw new Error("Error is fetch movie details");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }

    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = "🎬" + title;
    return () => (document.title = "🍿 usePopcorn");
  }, [title]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") onCloseMovie();
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2> {title} </h2>
              <p>
                {" "}
                {released} &bull; {runtime}{" "}
              </p>
              <p> {genre} </p>
              <p>
                {" "}
                <span>⭐️</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {watchedRating ? (
                <p>
                  You rated movie with {watchedRating} <span>⭐️</span>
                </p>
              ) : (
                <>
                  <Rating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to watched list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading ...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
