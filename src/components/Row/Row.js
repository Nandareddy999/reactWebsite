import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
      fetchData();
    },[]);

  async function fetchData() {
    const request = await axios.get(fetchUrl);
    setMovie(request.data.results);
  }
  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
        autohide: 1,
        wmode: 'opaque',
        origin: 'http://localhost:3000'
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      
      movieTrailer( movie?.name || movie?.title || movie?.original_title || "")
        .then((url) => {
          //console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);

          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h1>{title} </h1>
      <div className="row_posters">
        
        {movie?.map((movie) =>
          movie?.poster_path && movie?.backdrop_path ? (
            <img
              // className={`row_poster ${isLargeRow && "rowPoster_large"}`}
              className={`row_poster`}
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${base_url}${
                 movie?.poster_path 
              }`}
              alt={movie?.name}
            />
          ) : (
            ""
          )
        )}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;