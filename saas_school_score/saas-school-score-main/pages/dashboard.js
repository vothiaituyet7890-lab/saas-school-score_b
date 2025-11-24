import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStudents: 0 });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStats(res.data))
      .catch(err => console.error(err));

    axios.get('/api/students', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (students.length === 0) return;

    const ctx = document.getElementById('scoreChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: students.map(s => s.name),
        datasets: [{
          label: 'Score',
          data: students.map(s => s.score),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      }
    });
  }, [students]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '10px', border: '1px solid #ccc', flex: 1 }}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={{ padding: '10px', border: '1px solid #ccc', flex: 1 }}>
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
      </div>
      <canvas id="scoreChart" width="400" height="150"></canvas>
    </div>
  );
}
