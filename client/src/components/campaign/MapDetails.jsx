import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Map from "../../components/map";
import useCampaignAssets from "../../hooks/useCampaignAssets";
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
  const { campaignAssets } = useCampaignAssets()
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
        { !!state?.data?.StoryCards?.length &&
          <div className='card'>
          <h3>Story Cards</h3>
            <ul>
              { state.data.StoryCards.map(card => {
                return <li>
                  <h3>
                  { card.order }
                  </h3>
                  <p>
                  { card.content }
                  </p>
                  Comepleted?: { card.completed.toString() }
                </li>
              })}
          </ul>
          </div>
        }
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
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae ipsum unde maiores accusantium dolore officia architecto natus, esse in, sunt facere, ducimus accusamus distinctio. Rem dolorem iusto ut minima quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nostrum iure dolore iusto. Ea ab, perferendis optio placeat officia earum cumque molestiae, illo recusandae explicabo cupiditate impedit dolorum magni expedita.'
}
</div>
      </div>
      <div className='map'>
        { Object.keys(state.data).length && <Map mapState={ state } setMapState={ setState } id={ state.mapId } key={ state.mapId } /> }
      </div>
      <div className='sidebar'>
          {/* Players List */}
        <div className='card'>
          <h3>Players</h3>
          <ul>
            { !!state?.data?.Players?.length &&
              state.data.Players.map(player => {
                return <li>{ player.email }</li>
              })
            }
          </ul>
        </div>
        {/* Assets/Maps tabs */}
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
            {/* Assets Card */ }
            
            { !!tabStatus.tAssetsFMaps &&
            Object.keys(state.data.NPCs).map((key) => {
              return (
                <p>
                  {state.data.NPCs[key].name}
                </p>)
              })
            }
            { !!tabStatus.tAssetsFMaps &&
            Object.keys(state.data.Images).map((key) => {
                return (
                  <p>
                    {state.data.Images[key].name}
                  </p>
                )
              })
            }
            {/* + JSON.stringify(campaignAssets) */ }
            { !!tabStatus.tAssetsFMaps &&
              <>
                <h1>Available Assets</h1> <hr /> 
              </>
            }
            { !!tabStatus.tAssetsFMaps &&
              Object.keys(campaignAssets.NPCs).map((id) => {
                return (
                  <div className="asset-card">
                    <h1 style={ {
                    backgroundImage: `url("${campaignAssets.NPCs[id].img}")`,
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    objectFit: 'contain'
                  } }>NPC - { campaignAssets.NPCs[id].name }</h1>
                    <h3>Is alive?: { campaignAssets.NPCs[id].alive.toString() }</h3>
                    <p>
                      <ol>
                        <li>
                          { campaignAssets.NPCs[id].bio }
                        </li>
                        <li>
                          { campaignAssets.NPCs[id].details }
                        </li>
                      </ol>
                    </p>
                    <button onClick={() => console.log(state.mapId, campaignAssets.NPCs[id])}>Add</button>
                  </div>                  
                )
              })
            }
            { !!tabStatus.tAssetsFMaps &&
              Object.keys(campaignAssets.Images).map((id) => {
                return (
                  <div className="asset-card" style={ {
                    backgroundImage: `url("${campaignAssets.Images[id].src}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    objectFit: 'contain'
                  } }>
                    <h3>IMG - { campaignAssets.Images[id].name }</h3>
                    {/* <h3>Is alive?: { campaignAssets.Images[id].alive.toString() }</h3> */}
                    <button onClick={() => console.log(state.mapId, campaignAssets.Images[id])}>Add</button>
                  </div>                  
                )
              })
            }

            {/* Maps Card */}
            {!!!tabStatus.tAssetsFMaps && !!mapsForCampaign.length && mapsForCampaign.map(map => {
              return <Link to={ `${map.id}` } onClick={ () => setState(prev => {
                return { ...prev, mapId: map.id, background: map.id === prev.mapId ? prev.background : null, data: map.id === prev.mapId ? { ...prev.data } : { ...prev.data, Images: {}, NPCs: {}, StoryCards: {}}}
              })
              }>{ map.name }</Link>
              
            })
            }
          </div>
        </div>
      </div>
    </container>
  );
}

export default MapDetails;