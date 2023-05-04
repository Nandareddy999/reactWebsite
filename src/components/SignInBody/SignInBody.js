import React from "react";
import { useState } from "react";
import "./SignInBody.css";

function SignInBody() {
  const [showSignInBox, setShowSignInBox] = useState(true);

  return (
    <>
      {showSignInBox ? (
        <div className="signinbody_container">
          <div className="signinbody_form">
            <p className="signinbody_title">Sign In</p>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign In</button>
            <button>Login as Guest User</button>
            <p className="signinbody_text">
              New to MovieApp?{" "}
              <span onClick={() => setShowSignInBox(false)}>SignUp Now.</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="signinbody_container">
          <div className="signinbody_form">
            <p className="signinbody_title">Sign Up</p>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
            <button>Login as Guest User</button>
            <p className="signinbody_text">
              Have an account?{" "}
              <span onClick={() => setShowSignInBox(true)}>SignIn Now.</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInBody;
