import { useContext, useState } from 'react';
import AuthContext from "../providers/AuthProvider";


const LogoutButton = () => {
  const { auth, setAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSubmit = () => {
    setAuth({user_id: '', email: ''})
    window.localStorage.clear()
    // console.log(`auth: `, auth)
    // console.log(` user_id: `, window.localStorage.getItem("user_id"))
  }

  return(
    <button onClick={handleSubmit}>Logout</button>
  )
}

export default LogoutButton;