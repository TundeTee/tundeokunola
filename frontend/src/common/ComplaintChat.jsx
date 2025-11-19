import { useState, useEffect } from "react";
import { apiLogin, apiRegister, apiMe, postComplaint, listComplaints, respondComplaint, myComplaints } from "../api.js";
function ComplaintChat({ onClose }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setMode('login'); return; }
    apiMe(token).then(async ({ user }) => {
      setUser(user);
      setMode('compose');
      try {
        if (user.role === 'admin') {
          const { complaints } = await listComplaints({ token });
          setComplaints(complaints || []);
        } else {
          const { complaints } = await myComplaints({ token });
          setComplaints(complaints || []);
        }
      } catch {token}
    }).catch(() => setMode('login'));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); setError(''); setSuccess('');
    try {
      const data = await apiLogin({ email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setMode('compose');
      setSuccess('Login successful.');
      setEmail(''); setPassword('');
      if (data.user.role === 'admin') {
        const { complaints } = await listComplaints({ token: data.token });
        setComplaints(complaints);
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally { setIsSubmitting(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); setError(''); setSuccess('');
    try {
      const data = await apiRegister({ name, email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setMode('compose');
      setSuccess('Registration successful.');
      setName(''); setEmail(''); setPassword('');
    } catch (err) {
      setError(err.message || 'Register failed');
    } finally { setIsSubmitting(false); }
  };

  const handleSendComplaint = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitting(true); setError(''); setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const { complaint } = await postComplaint({ token, message });
      setSuccess('Your complaint has been sent.');
      setMessage('');
      try {
        if (user?.role === 'admin') {
          const { complaints } = await listComplaints({ token });
          setComplaints(complaints || []);
        } else {
          const { complaints } = await myComplaints({ token });
          setComplaints(complaints || []);
        }
      } catch {complaint}
    } catch (err) {
      setError(err.message || 'Failed to send complaint');
    } finally { setIsSubmitting(false); }
  };

  const handleRespond = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedId) return;
    setIsSubmitting(true); setError(''); setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const { complaint } = await respondComplaint({ token, id: selectedId, response: replyText, status: 'reviewed' });
      setSuccess('Reply sent.');
      setReplyText('');
      setComplaints((prev) => prev.map(c => c._id === complaint._id ? complaint : c));
    } catch (err) {
      setError(err.message || 'Failed to reply');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white">
          <h3 className="text-lg font-semibold">Complaint</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200" aria-label="Close">✕</button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto overscroll-auto space-y-4">
          <div className="flex gap-2">
            <button className={`px-3 py-1 rounded ${mode==='login'?'bg-blue-300 text-white':'bg-gray-200'}`} onClick={() => setMode('login')}>Login</button>
            <button className={`px-3 py-1 rounded ${mode==='register'?'bg-blue-300 text-white':'bg-gray-200'}`} onClick={() => setMode('register')}>Register</button>
            <button className={`px-3 py-1 rounded ${mode==='compose'?'bg-blue-300 text-white':'bg-gray-200'}`} onClick={() => setMode('compose')} disabled={!user}>Compose</button>
            {user?.role === 'admin' && (
              <button className={`px-3 py-1 rounded ${mode==='admin'?'bg-blue-300 text-white':'bg-gray-200'}`} onClick={() => setMode('admin')}>Admin Reply</button>
            )}
          </div>

          {success && <div className="rounded bg-green-50 border border-green-200 p-2 text-green-800">{success}</div>}
          {error && <div className="rounded bg-red-50 border border-red-200 p-2 text-red-800">{error}</div>}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
                <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-300 hover:bg-blue-400 disabled:bg-blue-400 text-white py-2 px-6 rounded-md">{isSubmitting ? 'Logging in...' : 'Login'}</button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700">Name</label>
                <input id="reg-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">Password</label>
                <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-300 hover:bg-blue-400 disabled:bg-blue-400 text-white py-2 px-6 rounded-md">{isSubmitting ? 'Registering...' : 'Register'}</button>
            </form>
          )}

          {mode === 'compose' && (
            <form onSubmit={handleSendComplaint} className="space-y-4">
              <div>
                <label htmlFor="complaint-message" className="block text-sm font-medium text-gray-700">Your Complaint *</label>
                <textarea id="complaint-message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required className="mt-1 block w-full rounded-md border px-3 py-2 resize-y" />
              </div>
              <button type="submit" disabled={isSubmitting || !message.trim()} className="w-full bg-blue-300 hover:bg-blue-400 disabled:bg-blue-400 text-white py-2 px-6 rounded-md">{isSubmitting ? 'Sending...' : 'Send Complaint'}</button>

              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Your Complaints</div>
                <ul className="space-y-2">
                  {complaints.map((c) => (
                    <li key={c._id} className="p-2 border rounded">
                      <div className="text-sm text-gray-700">{c.message}</div>
                      <div className="text-xs text-gray-500">Status: {c.status}</div>
                      {c.adminResponse && <div className="text-xs text-green-700 mt-1">Admin reply: {c.adminResponse}</div>}
                    </li>
                  ))}
                  {complaints.length === 0 && <li className="text-xs text-gray-500">No complaints yet.</li>}
                </ul>
              </div>
            </form>
          )}

          {mode === 'admin' && user?.role === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">Complaints</div>
                <ul className="space-y-2 max-h-[50vh] overflow-y-auto overscroll-auto pr-1">
                  {complaints.map(c => (
                    <li key={c._id} className={`p-2 border rounded ${selectedId===c._id?'border-blue-300':'border-gray-300'}`}>
                      <button className="text-left w-full" onClick={() => setSelectedId(c._id)}>
                        <div className="font-semibold">{c.email}</div>
                        <div className="text-sm text-gray-600">{c.message}</div>
                        <div className="text-xs text-gray-500">Status: {c.status}</div>
                        {c.adminResponse && <div className="text-xs text-green-700 mt-1">Reply: {c.adminResponse}</div>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <form onSubmit={handleRespond} className="space-y-4">
                <div>
                  <label htmlFor="reply-text" className="block text-sm font-medium text-gray-700">Reply</label>
                  <textarea id="reply-text" rows={5} value={replyText} onChange={(e) => setReplyText(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 resize-y" />
                </div>
                <button type="submit" disabled={isSubmitting || !replyText.trim() || !selectedId} className="w-full bg-blue-300 hover:bg-blue-400 disabled:bg-blue-400 text-white py-2 px-6 rounded-md">{isSubmitting ? 'Replying...' : 'Send Reply'}</button>
              </form>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
          Admin will be notified after submission
        </div>
      </div>
      </div>
    );
}
export default ComplaintChat;