const base = import.meta.env.VITE_API_BASE || '/api';

export async function apiLogin({ email, password }) {
  const res = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Login failed');
  return res.json();
}

export async function apiRegister({ name, email, password, role, adminCode }) {
  const res = await fetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role, adminCode }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Register failed');
  return res.json();
}

export async function apiMe(token) {
  const res = await fetch(`${base}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to load user');
  return res.json();
}

export async function postComplaint({ token, message }) {
  const res = await fetch(`${base}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Submit failed');
  return res.json();
}

export async function listComplaints({ token }) {
  const res = await fetch(`${base}/complaints`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to list complaints');
  return res.json();
}

export async function myComplaints({ token }) {
  const res = await fetch(`${base}/complaints/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed to load complaints');
  return res.json();
}

export async function respondComplaint({ token, id, response, status }) {
  const res = await fetch(`${base}/complaints/${id}/respond`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ response, status }),
  });
  if (!res.ok) throw new Error('Failed to respond');
  return res.json();
}

export async function deleteComplaint({ token, id }) {
  const res = await fetch(`${base}/complaints/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed to delete');
  return res.json();
}