import { React, useState } from "react";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


return (
  <form>
  <label>
    <p>Email</p>
    <input type="text" onChange={e => setEmail(e.target.value)}/>
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

export default Register;