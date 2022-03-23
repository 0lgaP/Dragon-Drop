import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import Home from '../components/Home';
import AuthContext from "../providers/AuthProvider";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios'
const LOGIN_URL = "/login";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log(`auth: `, auth)
  // console.log(`user_id: `, window.localStorage.getItem("user_id"))

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("P", password)
      console.log("E", email)
      const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}),
      {
        headers: { 'Content-type': 'application/json'},
      });
      const user_id = response?.data?.id
      setAuth({email, password, user_id})
      window.localStorage.setItem("user_id", JSON.stringify(user_id))
      window.localStorage.setItem("user_email", JSON.stringify(email))
      setEmail('')
      setPassword('');
      window.location.reload(true);
      // console.log(` inside func auth: `, auth)
      // console.log(`inside func auth user_id: `, window.localStorage.getItem("user_id"))
    }
    catch(err) {
      
    }
    
  }
  
  return(
    <section>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>Email</p>
        <input type="text" onChange={e => setEmail(e.target.value)} value={email}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </section>
  )
}

export default Login;