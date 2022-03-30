//On home page, header should read 'register' and 'login'
// if user is logged in, it reads 'campaigns' and 'image-> username' which links to profile
import { React, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import AuthContext from "../providers/AuthProvider";
import CampContext from "../providers/CampProvider";
import LogoutButton from "./LogoutButton";

const Header = (props) => {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  // console.log(auth)
  // const { data: user, error, isPending } = useFetch('http://localhost:3000/users/' + u_id)
  const userAuth = window.localStorage.getItem("user_id");
  if (userAuth && JSON.parse(userAuth) === auth.user_id) {
    const u_id = auth.user_id;
    return (
      <div className="bg-header text-xl text-textcolor flex flex-row p-2 w-full">
        <div className="header-left flex flex-row m-4 justify-start w-full">
          <Link to={`/users/${auth.user_id}/campaigns/${campaign()}`}>
            <img
              className="m-1 mr-4 w-20"
              src="https://i.imgur.com/pMfFYJc.png"
              alt="dragon drop logo"
            />
          </Link>
          <h2 id="app-name" className="m-4 mt-6 text-5xl">
            Dragon Drop
          </h2>
        </div>
        <div className="header-right flex flex-row m-4 mt-8 justify-end text-2xl tracking-wide">
          <div className="m-4 font-title ">
            <Link to={`/users/${u_id}/campaigns`}>
              <h3>Campaigns</h3>
            </Link>
          </div>
          <div className="m-4 font-title">
            <Link to={`/users/${u_id}`}>{auth.email}</Link>
          </div>
          <div className="m-4 font-title">
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-header text-xl text-textcolor flex flex-row p-2 w-full">
        <div className="header-left flex flex-row m-4 justify-start w-full">
          <img
            className="m-1 mr-4 w-20"
            src="https://i.imgur.com/pMfFYJc.png"
            alt="dragon drop logo"
          ></img>
          <h2 id="app-name" className="m-4 mt-6 text-4xl">
            Dragon Drop
          </h2>
        </div>
        <div className="header-right flex flex-row m-4 mt-8 justify-end text-2xl tracking-wide">
          <div className="m-4">
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </div>
          <div className="m-4">
            <Link to="/login">
              <h3>Login</h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
