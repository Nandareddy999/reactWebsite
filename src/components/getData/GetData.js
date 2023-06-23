import React, { useState, useEffect } from 'react';
import './GetData.css';

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

  const generateSearchLink = (query) => {
    const encodedQuery = encodeURIComponent(query);
    return `https://www.google.com/search?q=${encodedQuery}`;
  };

  return (
    <div>
      <h1>Trending Movies and TV Shows</h1><br/><br/>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie._id} className="movie">
            {movie.thumbnail && (
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.thumbnail}`}
                  alt={movie.title}
                />
                <h3 className="movie-title">{movie.title}</h3>
              </div>
            )}
            <div className="movie-info">
              <p>
                Release date:{' '}
                {movie.year ? movie.year : (
                  <a
                    href={generateSearchLink(`Release date of ${movie.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google it!
                  </a>
                )}
              </p>
              <p>
                Director: {movie.director || (
                  <a
                    href={generateSearchLink(`Director of ${movie.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google it!
                  </a>
                )}
              </p>
              <p>
                Actors: {movie.actors || (
                  <a
                    href={generateSearchLink(`Actors in ${movie.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google it!
                  </a>
                )}
              </p>
              <p>
                Writers: {movie.writers || (
                  <a
                    href={generateSearchLink(`Writers of ${movie.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google it!
                  </a>
                )}
              </p>
              {movie.description && (
                <p>
                  Description: {movie.description}
                </p>
              )}
              {movie.trailer && (
                <p>
                  Trailer:{' '}
                  <a
                    href={generateSearchLink(`Trailer of ${movie.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here to watch trailer
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetData;
