import { useState } from 'react';
import { sendOtp, verifyOtp } from '../api';
import { useNavigate } from 'react-router-dom';

export default function PublicPortalLogin() {
  const [mobile, setMobile] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (aadhar.length !== 12) { setMessage('Aadhaar must be 12 digits'); return; }
    try {
      await sendOtp({ mobile, aadhar });
      setOtpSent(true);
      setMessage('OTP sent');
    } catch (err) { setMessage(err.response?.data?.message || 'Error'); }
  };

  const handleVerify = async () => {
    try {
      await verifyOtp({ mobile, aadhar, otp });
      setMessage('Login successful');
      navigate('/public');
    } catch (err) { setMessage(err.response?.data?.message || 'Invalid OTP'); }
  };

  return (
    <div className="container">
      <h2>Public Portal Login</h2>
      <div className="card" style={{ maxWidth: 480 }}>
        <input placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} maxLength={10} />
        <input placeholder="Aadhaar Number" value={aadhar} onChange={(e) => setAadhar(e.target.value)} maxLength={12} />
        {!otpSent ? (
          <button className="button" onClick={handleSendOtp}>Send OTP</button>
        ) : (
          <>
            <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
            <button className="button" onClick={handleVerify}>Verify OTP</button>
          </>
        )}
      </div>
      <p style={{ color: '#2e7d32' }}>{message}</p>
    </div>
  );
}
