import React from "react";
import { Link, useParams } from "react-router-dom";

const Navbar = () => {

  const { u_id, c_id } = useParams();
  if (u_id) {
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