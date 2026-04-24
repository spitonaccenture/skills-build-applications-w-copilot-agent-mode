import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const baseURL = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api/users/`
        : 'http://localhost:8000';
      const apiURL = `${baseURL}/api/users/`;

      console.log('Fetching from endpoint:', apiURL);

      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched users data:', data);

      // Handle both paginated (.results) and plain array responses
      const usersList = data.results || data;
      console.log('Users list:', usersList);

      setUsers(Array.isArray(usersList) ? usersList : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="content-section">
        <h2 className="mb-4">
          <i className="bi bi-people-fill"></i> Users Management
        </h2>

        {loading && (
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading users...
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="empty-state">
            <h3>No Users Found</h3>
            <p>There are currently no users in the system.</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-bold">ID</th>
                  <th scope="col" className="fw-bold">Username</th>
                  <th scope="col" className="fw-bold">Email</th>
                  <th scope="col" className="fw-bold">Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span className="badge bg-primary">{user.id}</span>
                    </td>
                    <td className="fw-semibold">{user.username}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.team ? (
                        <span className="badge bg-success">{user.team}</span>
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
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

export default Users;
