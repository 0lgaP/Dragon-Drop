import React, { useState, useContext } from "react";
import { Redirect } from 'react-router-dom'
import AuthContext from "../providers/AuthProvider";
import './Login.css'
import axios from '../api/axios'

const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  // const {campaign} = useContext(CampContext);
  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const campaignsAddress = `users/${userAuth}/campaigns`

  // console.log(`auth: `, auth)
  // console.log(`user_id: `, window.localStorage.getItem("user_id"))
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("P", password)
      // console.log("E", email)
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }),
        {
          headers: { 'Content-type': 'application/json' },
        });
      const user_id = response?.data?.id
      setAuth({ email, password, user_id })
      window.localStorage.setItem("user_id", JSON.stringify(user_id))
      window.localStorage.setItem("user_email", JSON.stringify(email))
      setEmail('')
      setPassword('');
      window.location.reload(true);
    }
    catch (err) {

    }
  }
  if (!userAuth) {
    return (
      <section className="login-page">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-label">
            <p>Email</p>
            <input className="input-field" type="text" onChange={e => setEmail(e.target.value)} value={email} />
          </label>
          <label className="input-label">
            <p>Password</p>
            <input className="input-field" type="password" onChange={e => setPassword(e.target.value)} value={password} />
          </label>
          <div>
            <button className="submit-button" type="submit">Submit</button>
          </div>
        </form>
      </section>
    )

  }
  else {
    return (
      <Redirect to={campaignsAddress} />
    )

  }
}
export default Login;