import React, { useState, useEffect } from 'react';

const Rating = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=5f54a7e47748967cfd4b095b8b514032&language=en-US')
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
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
      description: selectedMovie.overview,
      //trailer: trailerUrl ? trailerUrl : '',
      genre: selectedMovie.genres ? selectedMovie.genres.map((genre) => genre.name).join(', ') : '',
      director: '',
      writers: ''
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
            <div className="movie-info">
              <h3>{movie.title || movie.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.title || selectedMovie.name}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
          <p>Genre: {selectedMovie.genres?.map(genre => genre.name).join(", ") || "N/A"}</p>
          <p>Description: {selectedMovie.overview || "N/A"}</p>
          <p>Director: {selectedMovie.credits?.crew?.find(crew => crew.job === "Director")?.name || "N/A"}</p>
          <p>Writers: {selectedMovie.credits?.crew?.filter(crew => crew.department === "Writing").map(crew => crew.name).join(", ") || "N/A"}</p>
          <p>Trailer: <a href={`https://www.youtube.com/watch?v=${selectedMovie.videos?.results?.[0]?.key || ""}`}>Click here to watch trailer</a></p>

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
      )}
    </div>
  );
};

export default Rating;
