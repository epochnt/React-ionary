import { useState, useEffect } from "react";

const OMDB_BASE_URL = import.meta.env.VITE_OMDB_URL;
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

      // handleCloseMovie();
      fetchMovies();
      return () => controller.abort();
    },
    [query]
  );

  return [movies, isloading, error]
}