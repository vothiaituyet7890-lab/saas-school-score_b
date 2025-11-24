import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', class: '', score: 0 });
  const [editing, setEditing] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchStudents = async () => {
    const res = await axios.get('/api/students', { headers: { Authorization: `Bearer ${token}` } });
    setStudents(res.data);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/students/${editing}`, form, { headers: { Authorization: `Bearer ${token}` } });
      setEditing(null);
    } else {
      await axios.post('/api/students', form, { headers: { Authorization: `Bearer ${token}` } });
    }
    setForm({ name: '', class: '', score: 0 });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, class: student.class, score: student.score });
    setEditing(student.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await axios.delete(`/api/students/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchStudents();
  };

  return (
    <div style={{ maxWidth: 800, margin: '50px auto' }}>
      <h1>Your Students</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Class" value={form.class} onChange={e => setForm({...form, class: e.target.value})} required />
        <input type="number" placeholder="Score" value={form.score} onChange={e => setForm({...form, score: Number(e.target.value)})} required />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} - {s.class} - {s.score}
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
