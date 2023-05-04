import React from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";

function HomePage() {
  return (
    <div className="Rows">
      <Navbar showSignInButton={false} logOut={true} />
      <Banner />
      <Row 
        title="Trending Movies"
        fetchUrl="https://api.themoviedb.org/3/trending/all/week?api_key=5f54a7e47748967cfd4b095b8b514032&language=en-US"
        isLargeRow
      />
      <Row 
        title="Netflix Originals"
        fetchUrl="https://api.themoviedb.org/3/discover/tv?api_key=5f54a7e47748967cfd4b095b8b514032&with_networks=123"
        isLargeRow
      />
      <Row
        title="Action Movies"
        fetchUrl="https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=28"
        isLargeRow
      />
      <Row
        title="Comedy Movies"
        fetchUrl="https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=35"
        isLargeRow
      />
      <Row
        title="Horror Movies"
        fetchUrl="https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=27"
        isLargeRow
      />
      <Row
        title="Romance Movies"
        fetchUrl="https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=10749"
        isLargeRow
      />
      <Row
        title="Documentaries"
        fetchUrl="https://api.themoviedb.org/3/discover/movie?api_key=5f54a7e47748967cfd4b095b8b514032&with_genres=99"
        isLargeRow
      />
    </div>
  );
}

export default HomePage;