import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const baseURL = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
      const apiURL = `${baseURL}/api/teams/`;

      console.log('Fetching from endpoint:', apiURL);

      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched teams data:', data);

      // Handle both paginated (.results) and plain array responses
      const teamsList = data.results || data;
      console.log('Teams list:', teamsList);

      setTeams(Array.isArray(teamsList) ? teamsList : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError(error.message);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="content-section">
        <h2 className="mb-4">
          <i className="bi bi-collection-fill"></i> Teams Management
        </h2>

        {loading && (
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading teams...
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && teams.length === 0 && (
          <div className="empty-state">
            <h3>No Teams Found</h3>
            <p>There are currently no teams in the system.</p>
          </div>
        )}

        {!loading && !error && teams.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-bold">ID</th>
                  <th scope="col" className="fw-bold">Team Name</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>
                      <span className="badge bg-primary">{team.id}</span>
                    </td>
                    <td className="fw-semibold">
                      <i className="bi bi-collection me-2"></i>
                      {team.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
