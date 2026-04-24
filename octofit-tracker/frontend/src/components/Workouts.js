import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const baseURL = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
        : 'http://localhost:8000';
      const apiURL = `${baseURL}/api/workouts/`;

      console.log('Fetching from endpoint:', apiURL);

      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched workouts data:', data);

      // Handle both paginated (.results) and plain array responses
      const workoutsList = data.results || data;
      console.log('Workouts list:', workoutsList);

      setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message);
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.id}</td>
                <td>{workout.name}</td>
                <td>{workout.description || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Workouts;
