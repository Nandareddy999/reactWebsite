import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Rating.css';

const Rating = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const ratingFormRef = useRef(null);
  const navigate = useNavigate();

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
    setRating(null);
    if (ratingFormRef.current) {
      ratingFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (selectedMovie) {
      const data = {
        title: selectedMovie.title,
        rating: rating,
        thumbnail: selectedMovie.poster_path,
        year: selectedMovie.release_date ? selectedMovie.release_date.substring(0, 4) : '',
        image: selectedMovie.backdrop_path,
        description: selectedMovie.overview.substring(0, 200),
        genre: selectedMovie.genres ? selectedMovie.genres.map((genre) => genre.name).join(', ') : '',
        vote_average: selectedMovie.vote_average,
        director: selectedMovie.director,
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

        setSubmissionStatus('Rating submitted successfully');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log('Movie not found');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/getData">
              <button className="top-rated-button">Top Rated Movies</button>
            </Link>
          </li>
          <li>
            <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
          </li>
        </ul>
      </nav>
      <h1>Trending Movies and TV Shows</h1>
      <div className="movies">
        {movies.map(movie => (
          <div key={movie.id} className="movie" onClick={() => handleMovieClick(movie)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`} alt={movie.title} />
            <h3>{movie.title || movie.name}</h3>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.title || selectedMovie.name}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path || selectedMovie.backdrop_path}`} alt={selectedMovie.title} />
          
          <div className="form-container" ref={ratingFormRef}>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={selectedMovie.title} readOnly />
            </div>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input type="number" id="rating" min="1" max="10" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {submissionStatus && <p>{submissionStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
