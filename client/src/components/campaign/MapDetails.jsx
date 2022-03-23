import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const params = useParams();
  const [urlParams, setUrlParams] = useState({ ...params });
  const { state, setState } = useMapData(urlParams.m_id, urlParams.c_id, urlParams.u_id)
  const [mapsForCampaign, setMapsForCampaign] = useState([]);
  const [tabStatus, setTabStatus] = useState({
    tStoryFNotes: true,
    tAssetsFMaps: false
  })

  useEffect(() => {
    axios.get(`/users/${urlParams.u_id}/campaigns/${urlParams.c_id}/maps`).then(result => setMapsForCampaign(result.data));
  }, [])

  return (
    <container className='mapContainer' id={ urlParams.mapId }>
      <div className='sidebar'>
        <h2>
          { state.name }
        </h2>
        <div className='card'>
          <h3>Story Cards</h3>
          <ul>
            <li>Map 1</li>
            <li>Map 2</li>
            <li>Map 3</li>
            <li>Map 4</li>
            <li>Map 5</li>
          </ul>
        </div>
        <div className='card'>
          <div className="tab-bar">
            <h3 onClick={ () => {
              setTabStatus(prev => {
                return {...prev, tStoryFNotes: true}
              })
            }}>Story</h3>
            <h3 onClick={ () => {
              setTabStatus(prev => {
                return {...prev, tStoryFNotes: false}
              })
            }}>Notes</h3>
          </div>
          { tabStatus.tStoryFNotes && 
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique tenetur explicabo suscipit quaerat totam doloremque voluptates dolores, atque, eaque ullam officiis dicta beatae labore adipisci? Doloribus atque expedita recusandae sequi.'
}
          { !tabStatus.tStoryFNotes && 
'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae ipsum unde maiores accusantium dolore officia architecto natus, esse in, sunt facere, ducimus accusamus distinctio. Rem dolorem iusto ut minima quos.'
}
</div>
      </div>
      <div className='map'>
    { Object.keys(state.data).length && <Map mapState={ state } /> }
      </div>
      <div className='sidebar'>
        <div className='card'>
          <h3>Players</h3>
          <ul>
            <li>Player 1</li>
            <li>Player 2</li>
            <li>Player 3</li>
            <li>Player 4</li>
            <li>Player 5</li>
          </ul>
        </div>
        <div className='card'>
          <div className="tab-bar">
            <h3 onClick={ () => {
              setTabStatus(prev => {
                return {...prev, tAssetsFMaps: true}
              })
            }}>Assets</h3>
            <h3 onClick={ () => {
              setTabStatus(prev => {
                return {...prev, tAssetsFMaps: false}
              })
            }}>Maps</h3>
          </div>
          <div className="card-body">

          { mapsForCampaign.length && !tabStatus.tAssetsFMaps && mapsForCampaign.map(map => {
            // return <Link to={ `/users/${urlParams.u_id}/campaigns/${urlParams.c_id}/maps/${map.id}` } onClick={() => window.location.reload()}>{map.name}</Link>
            
            // I am a horrible person for using react like this
            // Ill fix it later
            // -Josh
            return <a className="card" onClick={() => {window.location.href=`/users/${urlParams.u_id}/campaigns/${urlParams.c_id}/maps/${map.id}`}}>{map.name}</a>
          }) }
          </div>
        </div>
      </div>
    </container>
  );
}

export default MapDetails;