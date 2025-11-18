import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiMe, listComplaints, respondComplaint, deleteComplaint } from '../api.js';

function AdminPage() {
  // ... existing code ...
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authRequired, setAuthRequired] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/auth');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthRequired(true);
      setLoading(false);
      return;
    }
    apiMe(token)
      .then(({ user }) => {
        if (user.role !== 'admin') {
          setAuthRequired(true);
          setLoading(false);
          return;
        }
        setUser(user);
        return listComplaints({ token });
      })
      .then((res) => {
        if (res?.complaints) setComplaints(res.complaints);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load complaints');
        setLoading(false);
      });
  }, []);

  const handleRespond = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const token = localStorage.getItem('token');
    if (!token || !selectedId || !replyText.trim()) return;
    try {
      const { complaint } = await respondComplaint({
        token,
        id: selectedId,
        response: replyText,
        status: 'reviewed',
      });
      setComplaints((prev) => prev.map((c) => (c._id === complaint._id ? complaint : c)));
      setReplyText('');
      setSuccess('Reply sent.');
    } catch (err) {
      setError(err.message || 'Failed to reply');
    }
  };

  const handleDelete = async (id) => {
    setError(''); setSuccess('');
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await deleteComplaint({ token, id });
      setComplaints((prev) => prev.filter((c) => c._id !== id));
      if (selectedId === id) setSelectedId(null);
      setSuccess('Complaint deleted.');
    } catch (err) {
      setError(err.message || 'Failed to delete complaint');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-700">{error}</div>;
  }
  if (authRequired) {
    return (
      <div className="container mx-auto px-4 py-8 mb-14">
        <h1 className="text-2xl font-semibold mb-4">Admin Access Required</h1>
        <p className="mb-4">Please login as admin to continue.</p>
        <Link
          to="/admin/auth"
          className="inline-block px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Go to Admin Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Admin: Complaints</h1>

      {success && <div className="mb-3 rounded bg-green-50 border border-green-200 p-2 text-green-800">{success}</div>}
      {error && <div className="mb-3 rounded bg-red-50 border border-red-200 p-2 text-red-800">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-sm font-medium mb-2">Complaint List</div>
          <ul className="space-y-2">
            {complaints.map((c) => (
              <li
                key={c._id}
                className={`p-3 border rounded flex items-start justify-between gap-3 ${selectedId === c._id ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <button className="text-left flex-1" onClick={() => setSelectedId(c._id)}>
                  <div className="font-semibold">{c.email}</div>
                  <div className="text-sm text-gray-700">{c.message}</div>
                  <div className="text-xs text-gray-500">Status: {c.status}</div>
                  {c.adminResponse && <div className="text-xs text-green-700 mt-1">Reply: {c.adminResponse}</div>}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(c._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                  aria-label="Delete complaint"
                >
                  Delete
                </button>
              </li>
            ))}
            {complaints.length === 0 && <li className="text-sm text-gray-600">No complaints found.</li>}
          </ul>
        </div>

        <form onSubmit={handleRespond} className="space-y-4">
          <div className="text-sm font-medium">Respond</div>
          <div>
            <label htmlFor="reply-text" className="block text-sm font-medium text-gray-700">Reply</label>
            <textarea
              id="reply-text"
              rows={6}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 resize-y"
              placeholder="Write a response..."
            />
          </div>
          <button
            type="submit"
            disabled={!selectedId || !replyText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-6 rounded-md"
          >
            Send Reply
          </button>
          {!selectedId && <div className="text-xs text-gray-500">Select a complaint from the list to reply.</div>}
        </form>
      </div>
    </div>
  );
}

export default AdminPage;