import React from "react";
import { Link, useParams } from 'react-router-dom';
import Map from "../../components/map";
import useMapData from "../../hooks/useMapData";
import './MapDetails.css'

// Test URL
// http://localhost:3002/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/maps/927432f7-7839-4a6d-817f-8e1a925b2706
// Campaign: Middle Earth
// Map: Tavern
// User: rick.sandchez@gmail.com
  // Pass: pass
const MapDetails = () => {
  const { u_id, c_id, m_id } = useParams();
  const { state, setState } = useMapData(m_id, c_id, u_id)

  return (
    <container class='mapContainer' >
      <div class='sidebar'>
        <h2>
          { state.name }
        </h2>
        <div class='card'>
          <h3>Story Cards</h3>
          <ul>
            <li>Map 1</li>
            <li>Map 2</li>
            <li>Map 3</li>
            <li>Map 4</li>
            <li>Map 5</li>
          </ul>
        </div>
        <div class='card'>
          <div className="tab-bar">
            <h3>Story</h3>
            <h3>Notes</h3>
          </div>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique tenetur explicabo suscipit quaerat totam doloremque voluptates dolores, atque, eaque ullam officiis dicta beatae labore adipisci? Doloribus atque expedita recusandae sequi.
        </div>
      </div>
      <div class='map'>
    { Object.keys(state.data).length && <Map mapState={ state } /> }
      </div>
      <div class='sidebar'>
        <h2>
          { state.name }
        </h2>
        <div class='card'>
          <h3>Players</h3>
          <ul>
            <li>Player 1</li>
            <li>Player 2</li>
            <li>Player 3</li>
            <li>Player 4</li>
            <li>Player 5</li>
          </ul>
        </div>
        <div class='card'>
          <div className="tab-bar">
            <h3>Assets</h3>
            <h3>Maps</h3>
          </div>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique tenetur explicabo suscipit quaerat totam doloremque voluptates dolores, atque, eaque ullam officiis dicta beatae labore adipisci? Doloribus atque expedita recusandae sequi.
        </div>
      </div>
    </container>
  );
}

export default MapDetails;