import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function Found404() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          잘못된 접근입니다.
        </p>
        <a
          className="App-link"
          href="/main/Home"
          // target="_blank"
          rel="noopener noreferrer"
        >
          집으로 돌아가기
        </a>
      </header>
    </div>
  );
}

export default Found404;