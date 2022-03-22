import {React, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../providers/AuthProvider";

const Navbar = (props) => {
  const { auth } = useContext(AuthContext);
  const { u_id, c_id } = useParams();
  const userAuth = window.localStorage.getItem("user_id")
  if (userAuth && JSON.parse(userAuth) === auth.user_id) {
    return (
      <nav>
        <div className="links">
          <Link to={`/users/${u_id}/campaigns/${c_id}/maps`}>Maps</Link>
          <Link to={`/users/${u_id}/campaigns/${c_id}/story`}>Story</Link>
          <Link to={`/users/${u_id}/campaigns/${c_id}/party`}>Party</Link>
          <Link to={`/users/${u_id}/campaigns/${c_id}/npcs`}>NPCs</Link>
        </div>
      </nav>
    );
  }
  else {
    return (
      <nav>
        <h2>Get started building YOUR world today!</h2>
      </nav>
    )
  }

}

export default Navbar;