import React from 'react';
import SignUpForm from './signup';
import SignInForm from './signin';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../src/style.css'

function SignUpAndSignInCombine() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const [showBackground, setShowBackground] = useState(true);

  const toggleBackground = () => {
    setShowBackground(!showBackground);
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <>
      <div className='container-fluid'>
        <h2 className='main-title'>Sign In / Sign-up</h2>
        <div className={containerClass} >

          <SignUpForm />
          <SignInForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left" style={{
                backgroundImage: showBackground ? `url('https://npr.brightspotcdn.com/dims4/default/8eb2bec/2147483647/strip/true/crop/1920x1277+0+0/resize/880x585!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F2b%2F73%2Fadb455324e60a4af8bd4f50076be%2Falejandro-lopez-aosaov2vtro-unsplash.jpg')` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'background-image 0.01s ease-in-out',
              }}>
                {/* <h1>Welcome Back!</h1> */}
                <p>
                  Already have an account? Sign In here
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right" style={{
                backgroundImage: showBackground ? `url('https://npr.brightspotcdn.com/dims4/default/8eb2bec/2147483647/strip/true/crop/1920x1277+0+0/resize/880x585!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F2b%2F73%2Fadb455324e60a4af8bd4f50076be%2Falejandro-lopez-aosaov2vtro-unsplash.jpg')` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'background-image 0.01s ease-in-out',
              }}>

                <p>Don't have an account? Signup here</p>
                <button
                  className="ghost "
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default SignUpAndSignInCombine;