import { useState } from 'react';
import axios from 'axios'; 
export default function RegisterPage() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT'); 
  // default role 
  const [error, setError] = useState(''); 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError(''); 
    try { 
      const response = await axios.post('/api/auth/register', { name, email, password, role }); 
      // Lưu token vào localStorage 
      localStorage.setItem('token', response.data.token); 
      // Redirect theo role 
      const userRole = response.data.user.role; 
      if (userRole === 'ADMIN') window.location.href = '/dashboard'; 
      if (userRole === 'TEACHER') window.location.href = '/dashboard-teacher'; 
      if (userRole === 'STUDENT') window.location.href = '/dashboard-student'; 
    } catch (err) {
      console.error(err); 
      setError(err.response?.data?.message || 'Registration failed'); 
    } 
  };
  return ( 
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}> 
  <h1>Register</h1> 
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <input 
  type="text" placeholder="Name"
    value={name} 
      onChange={e => setName(e.target.value)} required 
        style={{ padding: '8px', fontSize: '16px' }}
/> 
  <input type="email" 
  placeholder="Email" v
    alue={email} 
      onChange={e => setEmail(e.target.value)} 
      required 
        style={{ padding: '8px', fontSize: '16px' }} 
/> 
  <input type="password" 
  placeholder="Password" 
    value={password} 
      onChange={e => setPassword(e.target.value)} required 
        style={{ padding: '8px', fontSize: '16px' }} 
/> 
  <select 
  value={role} 
    onChange={e => setRole(e.target.value)} 
      style={{ padding: '8px', fontSize: '16px' }} 
> 
  <option value="STUDENT">Student</option> 
  <option value="TEACHER">Teacher</option> 
  <option value="ADMIN">Admin</option> 
  </select> 
  <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Register</button> 
  </form> {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} 
  <p style={{ marginTop: '20px' }}> 
Already have an account? <a href="/login">Login here</a>
  </p> 
  </div> 
  );
