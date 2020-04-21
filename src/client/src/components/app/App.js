import React from "react";
import logo from "../../assets/img/logo.svg";
import "./App.css";

import AppHeader from "./AppHeader";
import AppBody from "./AppBody";

const App = () => (
  <>
    <AppHeader />
    <div className="App">
      <AppBody />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  </>
);

export default App;
