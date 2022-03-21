import { React, useState } from "react";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('http://localhost:8081/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 

const Login = ( {setToken} ) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        <p>Email</p>
        <input type="text" onChange={e => setUsername(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default Login;