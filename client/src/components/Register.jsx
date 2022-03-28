import { React, useState } from "react";
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
return (
  <section className="register-page">
    <h1>Register here!</h1>
  <form className="register-form">
  <label className="input-label">
    <p>Email</p>
    <input className="input-field" type="text" onChange={e => setEmail(e.target.value)}/>
  </label>
  <label className="input-label">
    <p>Password</p>
    <input className="input-field" type="password" onChange={e => setPassword(e.target.value)}/>
  </label>
  <div>
    <button className="submit-button" type="submit">Sign Up</button>
  </div>
</form>
</section>
)
}

export default Register;