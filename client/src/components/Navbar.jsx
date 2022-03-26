import {React, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../providers/AuthProvider";
import CampContext from "../providers/CampProvider";
import './Navbar.css'

const Navbar = (props) => {
  const { auth } = useContext(AuthContext);
  const { campaign_id, campaign } = useContext(CampContext);
  const userAuth = window.localStorage.getItem("user_id")
  const u_id = auth.user_id
  // console.log("campaign id status in navbar: ", campaign)
 if (JSON.parse(userAuth) === auth.user_id && campaign()) {
    return (
      <nav className="bg-primary h-1/16 p-1 ">
        <div className="links flex flex-row justify-evenly h-1/16 m-6 text-textcolor text-xl">
          <div className="dropdown">
            <Link to={ `/users/${u_id}/campaigns/${campaign()}/maps` } className="hover:font-bold">Maps</Link>
                <div class="dropdown-content">
              <Link to={`/users/${u_id}/campaigns/${campaign()}/maps/new`}>New Map</Link>
                  <a href="#">Delete Map</a>
                </div>
          </div>
          <Link to={`/users/${u_id}/campaigns/${campaign()}/story`} className="hover:font-bold">Story</Link>
          <Link to={`/users/${u_id}/campaigns/${campaign()}/party`} className="hover:font-bold">Party</Link>
          <Link to={`/users/${u_id}/campaigns/${campaign()}/npcs`} className="hover:font-bold">NPCs</Link>
        </div>
      </nav>
    );
    }
  else {
    return (
      <nav className="bg-primary h-1/16 p-4 text-textcolor text-xl ">
        <h2>Get started building YOUR world today!</h2>
      </nav>
    )
  }

}

export default Navbar;