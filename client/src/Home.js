import React, { useEffect } from "react";
// import { BrowserRouter as Router, Link } from 'react-router-dom'
// import {Buffer} from 'buffer';
const Nylas = require('nylas');


function Home() {
    Nylas.config({
      clientId: REACT_APP_NYLAS_CLIENT_ID,
      clientSecret: REACT_APP_NYLAS_SECRET,
    });
  
    const options = {
      redirectURI: 'http://localhost:3000/secureuser',
      responseType: 'code'
      // scopes: [Scopes.EmailReadOnly, Scope.EmailSend],
    };
  
    // Redirect your user to the auth_url
    const authUrl = Nylas.urlForAuthentication(options);


  useEffect(() => {}, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1> This is Home Page of the Nylas Test F1 Scheduler.</h1>
      <h2>This is publically accessible Page.</h2>
      <br />
      <div>
      <a href={authUrl}>
          <button style={{ cursor: 'pointer', marginRight: '10px' }}>
              {/* <Link to={authUrl} style={{ textDecoration: 'none' }}> */}
                  Sign In
              {/* </Link> */}
          </button>
      </a>
      </div>
  </div>
  )
}

export default Home