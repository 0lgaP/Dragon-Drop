import React from "react";

const Register = () => {
return (
  <form>
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

export default Register;