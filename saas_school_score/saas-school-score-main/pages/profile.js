// pages/profile.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    axios.get('/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setUser(res.data); setLoading(false); })
      .catch(() => router.push('/login'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('/api/user/me', user, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Profile updated successfully ✅');
    } catch {
      setMessage('Update failed ❌');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '50px auto' }}>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} required/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} required/>
        </div>
        <div>
          <label>Password (leave blank to keep)</label>
          <input type="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})}/>
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
