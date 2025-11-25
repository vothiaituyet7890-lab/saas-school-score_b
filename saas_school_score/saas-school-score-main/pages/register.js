import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT'); // default role
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Gửi yêu cầu đăng ký đến API
      const response = await axios.post('/api/auth/register', { name, email, password, role });

      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token);

      // Chuyển hướng người dùng dựa trên role
      const userRole = response.data.user.role;
      
      if (userRole === 'ADMIN') {
        window.location.href = '/dashboard';
      } else if (userRole === 'TEACHER') {
        window.location.href = '/dashboard-teacher';
      } else if (userRole === 'STUDENT') {
        window.location.href = '/dashboard-student';
      }

    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      // Hiển thị thông báo lỗi từ server hoặc thông báo mặc định
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Đăng ký</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Input Name */}
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={inputStyle}
        />
        
        {/* Input Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        
        {/* Input Password */}
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        
        {/* Select Role */}
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="STUDENT">Học sinh</option>
          <option value="TEACHER">Giáo viên</option>
          <option value="ADMIN">Quản trị viên</option>
        </select>
        
        <button type="submit" style={buttonStyle}>Đăng ký</button>
      </form>
      
      {/* Hiển thị lỗi */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
      <p style={{ marginTop: '20px' }}>
        Đã có tài khoản? <a href="/login">Đăng nhập tại đây</a>
      </p>
    </div>
  );
}

// Định nghĩa Style để code gọn gàng hơn
const inputStyle = { 
  padding: '10px', 
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const buttonStyle = { 
  padding: '10px', 
  fontSize: '16px', 
  cursor: 'pointer',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '4px'
};
