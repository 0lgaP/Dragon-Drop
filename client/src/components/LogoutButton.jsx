import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../providers/AuthProvider";
import CampContext from '../providers/CampProvider';


const LogoutButton = () => {
  const { setAuth } = useContext(AuthContext)
  const { setCampaign } = useContext(CampContext);

  const handleSubmit = () => {
    setAuth({email: '', user_id: ''})
    setCampaign(null);
    window.localStorage.clear()
  }

  return(
    <Link to="/"><button onClick={handleSubmit}>Logout</button></Link>
  )
}

export default LogoutButton;