//On home page, header should read 'register' and 'login'
// if user is logged in, it reads 'campaigns' and 'image-> username' which links to profile
import React from 'react'
import { Link, useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';

const Header = () => {
  const { u_id } = useParams();
  const { data: user, error, isPending } = useFetch('http://localhost:3000/users/' + u_id)

  if (u_id) {
    return (
      <div className="header bg-blue-3170be ">
        <div className="header-left">
          <img className="logo"></img>
          <h2 id="app-name" className="text-lime-900">Dragon Drop</h2>
        </div>
        <div className="header-right">
          <Link to={`/users/${u_id}/campaigns`}><h3>Campaigns</h3></Link>
          <Link to={`/users/${u_id}`}>
            <img src="https://icon-library.com/images/dnd-icon/dnd-icon-13.jpg"></img>
            <h3>{user.email}</h3>
          </Link>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="header">
        <div className="header-left">
          <img className="logo"></img>
          <h2 id="app-name">Dragon Drop</h2>
        </div>
        <div className="header-right">
          <Link to="/register"><h3>Register</h3></Link>
          <Link to="/login"><h3>Login</h3></Link>
        </div>
      </div>
    );
  }

}

export default Header;