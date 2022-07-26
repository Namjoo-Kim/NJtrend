import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function Welcome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/Home"
          // target="_blank"
          rel="noopener noreferrer"
        >
          어서오세요!
        </a>
      </header>
    </div>
  );
}

export default Welcome;