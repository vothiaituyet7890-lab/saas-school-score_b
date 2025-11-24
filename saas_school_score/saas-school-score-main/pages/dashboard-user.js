import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) return;
    axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }, [token]);

  if (!student) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Dashboard</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Role:</strong> {student.role}</p>
      {student.student && (
        <>
          <p><strong>Class:</strong> {student.student.class}</p>
          <p><strong>Score:</strong> {student.student.score}</p>
        </>
      )}
    </div>
  );
}
