import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const baseURL = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
      const apiURL = `${baseURL}/api/activities/`;

      console.log('Fetching from endpoint:', apiURL);

      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched activities data:', data);

      // Handle both paginated (.results) and plain array responses
      const activitiesList = data.results || data;
      console.log('Activities list:', activitiesList);

      setActivities(Array.isArray(activitiesList) ? activitiesList : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError(error.message);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Workout</th>
              <th>Duration (mins)</th>
              <th>Calories</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.user}</td>
                <td>{activity.workout}</td>
                <td>{activity.duration}</td>
                <td>{activity.calories}</td>
                <td>{new Date(activity.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Activities;
