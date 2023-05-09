import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./container/LandingPage/LandingPage";
import SignIn from "./container/SignIn/SignIn";
import  Rating  from "./components/Rating/Rating";
import GetData from "./components/getData/GetData";
import HomePage from "./container/HomePage/HomePage";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <LandingPage />}
          />

           {/* <Route path = "/" element = {isLoading && isAuthenticated ? <Homepage/> : <Landingpage/>}/> */}
          {/* <Route path="/sign-in" element={<Signinbody />} /> */}
          {/* <Route path = "/" element = {<Homepage />}/> */}

          <Route 
            path="/Rating" element={<Rating/>}
          />
          <Route 
          path="/GetData" element={<GetData/>}
          />
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;