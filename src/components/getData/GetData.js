import React, { useState, useEffect } from 'react';

const GetData = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/movie/getData');

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Trending Movies and TV Shows</h1>
      <div className="movies">
        {movies.map(movie => (
          <div key={movie._id} className="movie">
            {movie.thumbnail && <img src={`https://image.tmdb.org/t/p/w500${movie.thumbnail}`} alt={movie.title} />}
            <h3>{movie.title}</h3>
            <div className="movie-info">
              <p>Release date : {movie.year || "N/A"}</p>
              <p>Genre: {movie.genre || "N/A"}</p>
              <p>Description: {movie.description || "N/A"}</p>
              <p>Average Votes : {movie.vote_average || "N/A"}</p>
              <p>Total voted : {movie.vote_count || "N/A"}</p>
              {movie.trailer && <p>Trailer: <a href={`https://www.youtube.com/watch?v=${movie.trailer}`} >Click here to watch trailer</a></p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetData;