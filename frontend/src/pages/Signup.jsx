import React from "react";

function Signup() {
  return (
    <div className="form">
      <h2>Signup</h2>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Create Account</button>
    </div>
  );
}

export default Signup;
