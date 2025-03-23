import { dbService } from './db';
import { saveToIndexedDB, getFromIndexedDB, deleteFromIndexedDB, updateIndexedDB, getAllFromIndexedDB } from '../services/indexdb';

// Mock the IndexedDB functions
jest.mock('../services/indexdb', () => ({
  saveToIndexedDB: jest.fn(),
  getFromIndexedDB: jest.fn(),
  deleteFromIndexedDB: jest.fn(),
  updateIndexedDB: jest.fn(),
  getAllFromIndexedDB: jest.fn(),
}));

describe('DatabaseService', () => {
  const mockUser = {
    id: 'user123',
    username: 'lucas',
    nickname: 'kyamel',
    email: 'lucascamelo03@gmail.com',
    password: '123456',
    is_active: true,
  };

  const mockUpdatedUser = { nickname: 'KyamelUpdated' };

  it('should create a user', async () => {
    saveToIndexedDB.mockResolvedValue(undefined);  // Simulate a successful save

    await expect(dbService.createUser(mockUser)).resolves.toBeUndefined();
    expect(saveToIndexedDB).toHaveBeenCalledWith('users', expect.objectContaining(mockUser));
  });

  it('should fetch a user', async () => {
    const user = { ...mockUser, id: 'user123' };
    getFromIndexedDB.mockResolvedValue(user);  // Simulate a successful fetch

    await expect(dbService.getUser('user123')).resolves.toEqual(user);
    expect(getFromIndexedDB).toHaveBeenCalledWith('users', 'user123');
  });

  it('should update a user', async () => {
    updateIndexedDB.mockResolvedValue(undefined);  // Simulate a successful update

    await expect(dbService.updateUser('user123', mockUpdatedUser)).resolves.toBeUndefined();
    expect(updateIndexedDB).toHaveBeenCalledWith('users', 'user123', mockUpdatedUser);
  });

  it('should delete a user', async () => {
    deleteFromIndexedDB.mockResolvedValue(undefined);  // Simulate a successful delete

    await expect(dbService.deleteUser('user123')).resolves.toBeUndefined();
    expect(deleteFromIndexedDB).toHaveBeenCalledWith('users', 'user123');
  });

  it('should fetch all users', async () => {
    const users = [mockUser];
    getAllFromIndexedDB.mockResolvedValue(users);  // Simulate a successful fetch of all users

    await expect(dbService.getAllUsers()).resolves.toEqual(users);
    expect(getAllFromIndexedDB).toHaveBeenCalledWith('users');
  });
});
