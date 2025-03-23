import React, { useState } from 'react';
import User from './user';
import { saveToIndexedDB, getFromIndexedDB } from './indexdb';

const TestComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveUsers = () => {
    const newUser1 = new User({
      id: 1,
      username: 'johndoe',
      nickname: 'John',
      email: 'john.doe@example.com',
      password: 'password123',
      is_active: true,
    });

    const newUser2 = new User({
      id: 2,
      username: 'janedoe',
      nickname: 'Jane',
      email: 'jane.doe@example.com',
      password: 'password456',
      is_active: false,
    });

    // Salva os usuários no IndexedDB
    Promise.all([
      saveToIndexedDB('users', newUser1),
      saveToIndexedDB('users', newUser2),
    ])
      .then(() => {
        console.log('Users saved successfully');
      })
      .catch((err) => {
        setError('Error saving users: ' + err.message);
      });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const user1 = await getFromIndexedDB('users', 1);
      const user2 = await getFromIndexedDB('users', 2);
      setUsers([user1, user2]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error fetching users: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Test Component</h2>
      <button onClick={saveUsers}>Save Users to IndexedDB</button>
      <button onClick={fetchUsers}>Fetch Users from IndexedDB</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {users.length > 0 && (
        <div>
          <h3>Users Information</h3>
          {users.map((user) => (
            <div key={user.id}>
              <p>ID: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Nickname: {user.nickname}</p>
              <p>Status: {user.is_active ? 'Active' : 'Inactive'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestComponent;