import {React, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../providers/AuthProvider";
import CampContext from "../providers/CampProvider";

const Navbar = (props) => {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const userAuth = window.localStorage.getItem("user_id")
  const u_id = auth.user_id
  const c_id = campaign
  // console.log("CAMPAI", campaign)
  if (userAuth && JSON.parse(userAuth) === auth.user_id) {
    return (
      <nav className="bg-primary h-full p-1 position-absolute">
        <div className="links flex flex-row justify-evenly h-full m-6 text-textcolor text-xl">
          <Link to={`/users/${u_id}/campaigns/${c_id}/maps`} className="hover:font-bold">Maps</Link>
          <Link to={`/users/${u_id}/campaigns/${c_id}/story`} className="hover:font-bold">Story</Link>
          <Link to={`/users/${u_id}/campaigns/${c_id}/party`} className="hover:font-bold">Party</Link>
          <Link to={`/users/${u_id}/campaigns/${c_id}/npcs`} className="hover:font-bold">NPCs</Link>
        </div>
      </nav>
    );
  }
  else {
    return (
      <nav className="bg-primary h-full p-4 position-absolute text-textcolor text-xl ">
        <h2>Get started building YOUR world today!</h2>
      </nav>
    )
  }

}

export default Navbar;