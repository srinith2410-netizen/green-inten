import { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '', userType: 'Public' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage(res.data?.message || 'Logged in');
      if (formData.userType === 'Public') navigate('/public');
      else if (formData.userType === 'Collector') navigate('/collector');
      else if (formData.userType === 'Recycler') navigate('/recycler');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 480 }}>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="Public">Public</option>
          <option value="Collector">Collector</option>
          <option value="Recycler">Recycler</option>
        </select>
        <button className="button" type="submit">Login</button>
      </form>
      <p style={{ color: '#2e7d32' }}>{message}</p>
    </div>
  );
}
