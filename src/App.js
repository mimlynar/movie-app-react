import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      const transformedMovies = data.results.map((md) => {
        return {
          id: md.episode_id,
          title: md.title,
          openingText: md.opening_crawl,
          releaseDate: md.release_date,
        };
      });
      setMovieList(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>loading</p>}
        <MoviesList movies={movieList} />
        {error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
