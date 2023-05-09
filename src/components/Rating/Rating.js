import React, { useState, useEffect } from 'react';
import './Rating.css';

const Rating = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const apiEndpoints = [
      'https://api.themoviedb.org/3/trending/all/week?api_key=5f54a7e47748967cfd4b095b8b514032&language=en-US',
      'https://api.themoviedb.org/3/discover/tv?api_key=5f54a7e47748967cfd4b095b8b514032&with_networks=123',
      'https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=28',
      'https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=35',
      'https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=27',
      'https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=10749',
      'https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=99'
    ];

    Promise.all(apiEndpoints.map(endpoint => fetch(endpoint)))
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        const allMovies = data.reduce((acc, endpointData) => {
          if (endpointData.results) {
            return [...acc, ...endpointData.results];
          }
          return acc;
        }, []);
        setMovies(allMovies);
      });
  }, []);
  
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSubmit = async () => {
    const data = {
      title: selectedMovie.title,
      rating: rating,
      thumbnail: selectedMovie.poster_path,
      year: selectedMovie.release_date ? selectedMovie.release_date.substring(0, 4) : '',
      image: selectedMovie.backdrop_path,
      description: selectedMovie.overview.substring(0,100),
      //trailer: https://www.youtube.com/watch?v=${selectedMovie.trailer},
      genre: selectedMovie.genres ? selectedMovie.genres.map((genre) => genre.name).join(', ') : '',
      vote_average : selectedMovie.vote_average,
      writers: selectedMovie.writers,
    };
  
    try {
      const response = await fetch('http://localhost:8080/movie/updateData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Error updating data');
      }
  
      console.log('Data updated successfully');
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div>
      <h1>Trending Movies and TV Shows</h1>
      <div className="movies">
        {movies.map(movie => (
          <div key={movie.id} className="movie" onClick={() => handleMovieClick(movie)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title || movie.name}</h3>
            <div className="movie-info">
              
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details">
        <h2>{selectedMovie.title || selectedMovie.name}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} /> 
        <p>Release date : {selectedMovie.release_date || "N/A"}</p>
        <p>Genre: {selectedMovie.genres?.map(genre => genre.name).join(", ") || "N/A"}</p>
        <p>Description: {selectedMovie.overview || "N/A"}</p>
        <p>Average Votes : {selectedMovie.vote_average || "N/A"}</p>
        <p>Total voted : {selectedMovie.vote_count || "N/A"}</p>
        <p>Trailer: <a href={`https://www.youtube.com/watch?v=${selectedMovie.videos?.results?.[0]?.key || ""}`} >Click here to watch trailer</a></p>
      
        <div className="form-container">
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /> 
          </div>
          <div>
            <label html For="rating">Rating:</label>
            <input type="number" id="rating" min="1" max="10" value={rating} onChange={(e) => setRating(e.target.value)} />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Rating;