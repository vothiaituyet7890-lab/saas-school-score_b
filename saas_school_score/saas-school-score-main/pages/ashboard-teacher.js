import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) return;
    axios.get('/api/students', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Teacher Dashboard</h1>
      <h2>My Students</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
