import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';

function App() {
  console.log('App component loaded');
  console.log('CODESPACE_NAME environment variable:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-4">
                  <div className="jumbotron">
                    <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                    <p className="lead">
                      Track your fitness activities, join teams, and compete on the leaderboard!
                    </p>
                    <hr className="my-4" />
                    <p>Use the navigation menu above to explore the application.</p>
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <p>&copy; 2024 OctoFit Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
