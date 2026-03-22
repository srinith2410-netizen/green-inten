import { useState } from 'react';
import { registerUser } from '../api';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', userType: 'Public' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.data?.message || 'Registered');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 480 }}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="Public">Public</option>
          <option value="Collector">Collector</option>
          <option value="Recycler">Recycler</option>
        </select>
        <button className="button" type="submit">Register</button>
      </form>
      <p style={{ color: '#2e7d32' }}>{message}</p>
    </div>
  );
}
