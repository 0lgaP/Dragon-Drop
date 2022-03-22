//On home page, header should read 'register' and 'login'
// if user is logged in, it reads 'campaigns' and 'image-> username' which links to profile
import {React, useContext} from 'react'
import { Link, useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';
import AuthContext from "../providers/AuthProvider";
import LogoutButton from './LogoutButton';

const Header = (props) => {
  const { auth } = useContext(AuthContext);
  // console.log(auth)
  // const { data: user, error, isPending } = useFetch('http://localhost:3000/users/' + u_id)
const userAuth = window.localStorage.getItem("user_id")
  if (userAuth && JSON.parse(userAuth) === auth.user_id) {
    const u_id = auth.user_id
    return (
      <nav className="bg-header text-xl text-textcolor flex flex-row" >
          <div>
            <img className="m-1 w-20" src="https://i.imgur.com/pMfFYJc.png" alt='dragon drop logo'></img>
          </div>
          <div className="m-4">
            <h2 id="app-name" className="">Dragon Drop</h2>
          </div>

          <div className="header-right flex flex-row m-4 justify-end">
            <div className="m-4">
              <Link to={`/users/${u_id}/campaigns`}><h3>Campaigns</h3></Link>
            </div>
            <div className="m-4">
              <Link to={`/users/${u_id}`}>{auth.email}</Link>
            </div>
            <div className="m-4">
              <LogoutButton />
            </div>
          </div>
      </nav>
    );
  }
  else {
    return (
      <div className="bg-header text-xl text-textcolor flex flex-row">
        <div className="header-left">
          <img className="logo"></img>
          <h2 id="app-name" className="">Dragon Drop</h2>
        </div>
        <div className="header-right flex flex-row m-4 justify-end">
          <div>
          <Link to="/register"><h3>Register</h3></Link>
          </div>
          <div>
          <Link to="/login"><h3>Login</h3></Link>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;