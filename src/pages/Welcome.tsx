import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import {Link} from "react-router-dom";

function Welcome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/Home">
          <a>어서오세요</a>
        </Link>
        {/* <a
          className="App-link"
          href="/Home"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          어서오세요!
        </a> */}
      </header>
    </div>
  );
}

export default Welcome;