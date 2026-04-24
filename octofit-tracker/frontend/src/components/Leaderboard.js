import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const baseURL = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
      const apiURL = `${baseURL}/api/leaderboard/`;

      console.log('Fetching from endpoint:', apiURL);

      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched leaderboard data:', data);

      // Handle both paginated (.results) and plain array responses
      const leaderboardList = data.results || data;
      console.log('Leaderboard list:', leaderboardList);

      setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError(error.message);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
                <td>{new Date(entry.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
