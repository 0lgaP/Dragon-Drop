import { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios'
const LOGIN_URL = "/login";

const Login = ( {setToken} ) => {
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}),
      {
        headers: { 'Content-type': 'application/json'},
        withCredentials: true
      });
      const accessToken = response?.data?.accessToken;
      setAuth({email, password, accessToken})
      console.log(JSON.stringify(response?.data));
      setEmail('')
      setPassword('');
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