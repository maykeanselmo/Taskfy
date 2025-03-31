import React, { useState } from 'react';
import { saveToIndexedDB, getFromIndexedDB, updateIndexedDB, deleteFromIndexedDB, getAllFromIndexedDB } from '../services/indexdb';

const TestComponent = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveUser = async () => {
    const newUser = {
      username: 'lucas2Doido2',
      nickname: 'kyamel',
      email: 'lucascamelo03@gmail.com',
    };
    try {
      await saveToIndexedDB('users', newUser);
      alert('User saved successfully!');
    } catch (err) {
      setError('Error saving user: ' + err.message);
    }
  };

  const fetchUser = async () => {
    if (!userId) return setError('Please enter an ID to fetch');
    setLoading(true);
    setError(null);
    try {
      const user = await getFromIndexedDB('users', Number(userId));
      setUsers(user ? [user] : []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error fetching user: ' + err.message);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const allUsers = await getAllFromIndexedDB('users');
      setUsers(allUsers);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error fetching all users: ' + err.message);
    }
  };

  const updateUser = async () => {
    if (!userId) return setError('Please enter an ID to update');
    try {
      await updateIndexedDB('users', Number(userId), { nickname: 'Updated Kyamel' });
      alert('User updated successfully!');
    } catch (err) {
      setError('Error updating user: ' + err.message);
    }
  };

  const deleteUser = async () => {
    if (!userId) return setError('Please enter an ID to delete');
    try {
      await deleteFromIndexedDB('users', Number(userId));
      alert('User deleted successfully!');
    } catch (err) {
      setError('Error deleting user: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>IndexedDB Test</h2>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" />
      <br /><br />
      <button onClick={saveUser}>Save User</button>
      <button onClick={fetchUser}>Fetch User</button>
      <button onClick={fetchAllUsers}>Fetch All Users</button>
      <button onClick={updateUser}>Update User</button>
      <button onClick={deleteUser}>Delete User</button>
      <br /><br />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {users.length > 0 && users.map((user) => (
          <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Nickname: {user.nickname}</p>
            <p>Email: {user.email}</p>
            <p>Status: {user.is_active ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestComponent;

import { dbService } from '../services/db_service';

// Criando um usuário
dbService.createUser({
  id: 'user123',
  username: 'lucas',
  nickname: 'kyamel',
  email: 'lucascamelo03@gmail.com',
  password: '123456',
  is_active: true
}).then(() => console.log('Usuário criado com sucesso'));

// Buscando um usuário
dbService.getUser('user123').then(user => console.log(user));

// Atualizando um usuário
dbService.updateUser('user123', { nickname: 'KyamelUpdated' })
  .then(() => console.log('Usuário atualizado'));

// Deletando um usuário
dbService.deleteUser('user123').then(() => console.log('Usuário deletado'));

// Buscando todas as tasks
dbService.getAllTasks().then(tasks => console.log(tasks));
