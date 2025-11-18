import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin, apiRegister } from '../api.js';

function AdminAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setIsSubmitting(true);
    try {
      const data = await apiLogin({ email, password });
      if (data.user?.role !== 'admin') {
        throw new Error('Admin access required.');
      }
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setIsSubmitting(true);
    try {
      const data = await apiRegister({ name, email, password, role: 'admin', adminCode });
      if (data.user?.role !== 'admin') {
        throw new Error('Registration did not grant admin role');
      }
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Register failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md relative mb-12">
      <h1 className="text-2xl font-semibold mb-4">Admin Access</h1>

      <div className="flex gap-2 mb-4">
        <button className={`px-3 py-1 rounded ${mode==='login'?'bg-blue-600 text-white':'bg-gray-200'}`} onClick={() => setMode('login')}>Login</button>
        <button className={`px-3 py-1 rounded ${mode==='register'?'bg-blue-600 text-white':'bg-gray-200'}`} onClick={() => setMode('register')}>Register</button>
      </div>

      {success && <div className="mb-3 rounded bg-green-50 border border-green-200 p-2 text-green-800">{success}</div>}
      {error && <div className="mb-3 rounded bg-red-50 border border-red-200 p-2 text-red-800">{error}</div>}

      {mode === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-6 rounded-md">
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {mode === 'register' && (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="admin-name" className="block text-sm font-medium text-gray-700">Name</label>
            <input id="admin-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label htmlFor="admin-reg-email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="admin-reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label htmlFor="admin-reg-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="admin-reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label htmlFor="admin-code" className="block text-sm font-medium text-gray-700">Admin Invite Code</label>
            <input id="admin-code" type="text" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="Enter admin invite code" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-6 rounded-md">
            {isSubmitting ? 'Registering...' : 'Register as Admin'}
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminAuth;