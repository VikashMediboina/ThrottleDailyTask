import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'
import { Routes } from './route';
import './style.scss'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter>
          <Routes></Routes>
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
