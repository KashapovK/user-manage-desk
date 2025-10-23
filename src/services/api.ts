import type { User } from '../types/types';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}
