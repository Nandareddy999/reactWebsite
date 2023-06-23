import React from "react";
import "./LandingPageContent.css";
import {useAuth0} from "@auth0/auth0-react"

function LandingPageContent() {
  const {loginWithRedirect} = useAuth0();

  const goToSignInPage = () => {
    // navigate("/sign-in");
    loginWithRedirect();
  };

  return (
    <div className="landingpagecontent_container">
      <p className="landingpagecontent_title">
        Unlimited films, TV programmes and more.
      </p>
      <p className="landingpagecontent_subtitle">
        Watch from anywhere. Cancel at anytime
      </p>
      <p className="landingpagecontent_description">
        Ready to watch? Enter your email to create or restart your membership.{" "}
      </p>
      <div className="landingpagecontent_input">
        <input type="text" />
        
          <button className="landingpagecontent_button" onClick={goToSignInPage}>GET STARTED</button>
        
      </div>
    </div>
  );
}

export default LandingPageContent;
