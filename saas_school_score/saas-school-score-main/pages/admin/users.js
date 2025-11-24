import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data))
      .catch(() => router.push('/login'));
  }, []);

  return (
    <div>
      <h2>All Users (Admin)</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} - {u.email} - {u.role} - Students: {u.students.length}</li>
        ))}
      </ul>
    </div>
  );
}
