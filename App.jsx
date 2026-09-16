import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:4000";

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Get all users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Unable to connect to the backend");
    }
  };

  // Load users when page opens
  useEffect(() => {
    fetchUsers();
  }, []);

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email) {
      setMessage("Please enter username and email");
      return;
    }

    try {
      let response;

      if (editingId) {
        // UPDATE
        response = await fetch(`${API_URL}/users/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
          }),
        });
      } else {
        // CREATE
        response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
          }),
        });
      }

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setUsername("");
      setEmail("");
      setEditingId(null);

      if (editingId) {
        setMessage("User updated successfully");
      } else {
        setMessage("User added successfully");
      }

      fetchUsers();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingId(user.id);
    setUsername(user.username);
    setEmail(user.email);

    setMessage("");
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setMessage("User deleted successfully");

      fetchUsers();
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete user");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setUsername("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container">
      <h1>Flask CRUD User Management</h1>

      <p className="subtitle">
        React + Flask + PostgreSQL + Docker
      </p>

      <div className="form-card">
        <h2>{editingId ? "Update User" : "Add User"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">
            {editingId ? "Update User" : "Add User"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      <div className="users-card">
        <h2>Users</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;