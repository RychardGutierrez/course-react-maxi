import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

import './App.css';

// const URL = 'https://swapi.py4e.com/api/films';
const URL = 'https://react-http-341f5-default-rtdb.firebaseio.com/movies.json';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let moviesMap = [];
    try {
      const responseFetchedMovies = await fetch(URL, {
        method: 'GET',
      });

      if (!responseFetchedMovies.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await responseFetchedMovies.json();
      for (let key in data) {
        moviesMap.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
    } catch (error) {
      console.log(error);
      setError({ message: 'Something went wrong!' });
    }

    setMovies(moviesMap);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    console.log(movie);
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Something went wrong when add movie');
      }
    } catch (error) {
      console.log(error);
      setError({ message: 'Something went wrong when add movie' });
    }
  };

  let content = (
    <section>
      <p>No Found Movies to show...</p>
    </section>
  );

  if (isLoading) {
    content = (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (error && !isLoading) {
    content = (
      <section>
        <p>{error.message}</p>
      </section>
    );
  }

  if (movies.length && !isLoading) {
    content = (
      <section>
        <MoviesList movies={movies} />
      </section>
    );
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {content}
    </React.Fragment>
  );
}

export default App;
