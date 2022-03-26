import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Map from "../../components/map";
import dataHelpers from "../../hooks/dataHelpers";
import useCampaignAssets from "../../hooks/useCampaignAssets";
import useMapData from "../../hooks/useMapData";
import update from "immutability-helper";

import './MapDetails.css'
import CampContext from "../../providers/CampProvider";
import StoryCardItem from "./StoryCards/StoryCardItem";
import AuthContext from "../../providers/AuthProvider";

// Test URL
// http://localhost:3002/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/maps/927432f7-7839-4a6d-817f-8e1a925b2706
// Campaign: Middle Earth
// Map: Tavern
// User: rick.sandchez@gmail.com
  // Pass: pass
const MapDetails = () => {
  const params = useParams();
  const [urlParams, setUrlParams] = useState({ ...params });
  const { campaign } = useContext(CampContext)
  const { auth } = useContext(AuthContext)
  const { state, setState } = useMapData(urlParams.m_id, urlParams.c_id, urlParams.u_id)
  const { campaignAssets } = useCampaignAssets()
  const [mapsForCampaign, setMapsForCampaign] = useState([]);
  const [tabStatus, setTabStatus] = useState({
    tStoryFNotes: true,
    tAssetsFMaps: false
  })

  function addAssetToMap(asset_id, type) {
    // state.mapId
    axios.post(`/users/0/campaigns/0/maps/${state.mapId}/assets`, { asset_id, type }).then(res => {
      const newAsset = dataHelpers().convertArrayToObject([res.data], 'id')
      const id = Object.keys(newAsset)[0]
      console.log(newAsset[id])

      let stateType = ''

      switch (newAsset[id].type[0]) {
        case 'N':
          stateType = 'NPCs'
          break;
        case 'I':
          stateType = 'Images'
          break;
        case 'S':
          stateType = 'StoryCards'
          break;
        default:
          stateType = 'Images'
      }

      setState(
        update(state, {
          data: {
            [stateType]: {
              [id]: {
                $set: newAsset[id]
              }
            }
          }
        })
      );
    })
  }

  async function deleteAssetFromMap(type, id) {
    setState(prev => {
      const newState = { ...prev }
      delete newState.data[type][id]
      return newState;
    })
    await axios.delete(`/users/0/campaigns/0/assets/${id}`)
  }

  async function updateLayer(type, id, layer) {
    const newOrder = parseInt(layer);
    await axios.put(`/users/${urlParams.u_id}/campaigns/${campaign()}/maps/:m_id/assets/${id}/layer`, {layer_order: newOrder, asset_id: id});
      setState(
        update(state, {
          data: {
            [type]: {
              [id]: {
                $merge: {layer_order: newOrder}
              }
            }
          }
        })
      );
  }
  function getLayer(type, id) {
    return state.data[type][id].layer_order;
  }

  async function updateNotes(text, updateDB) {
    if (updateDB) await axios.put(`/users/${urlParams.u_id}/campaigns/${campaign()}/notes`, { user_id: auth.user_id, content: text });
    // console.log('put notes',result)
      setState(
        update(state, {
          data: {
            Notes: {
              $merge : {content: text}
            }
          }
        })
      );
  }
  function getNotes(test) {
    // console.log(state.data.Notes.content.split(/\r\n|\r|\n/).length)
    return state.data.Notes.content;
  }


  useEffect(() => {
    axios.get(`/users/${urlParams.u_id}/campaigns/${urlParams.c_id}/maps`).then(result => setMapsForCampaign(result.data));
  }, [])

  const storyCardsForMap = state.data.StoryCards ? dataHelpers().convertObjectToArray(state.data.StoryCards).map(card => <StoryCardItem { ...card } text={ card.content } />) : null
  
  const entireStory = state.data.Story ? state.data.Story.map(card => <StoryCardItem { ...card } text={ card.story_card_text } order={ card.order_num } />) : null;

  return (
    <container className='mapContainer' id={ urlParams.mapId }>
      <div className='sidebar'>
        <h2 className='text-textcolor text-3xl m-2 mb-4 bg-header rounded-lg p-4'>
          { state.name }
        </h2>
        {/* Story cards assets for map */}
        { storyCardsForMap }
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
          { tabStatus.tStoryFNotes && entireStory }
          { !tabStatus.tStoryFNotes && 
            (
              <React.Fragment>
              <label>Notes : </label>
              <textarea type="textarea"
                name="notes"
                id='notesArea'
                value={ getNotes() }
                onChange={ e => {
                  e.target.style.height = "";
                  e.target.style.height = e.target.scrollHeight + "px"
                      updateNotes(document.getElementById('notesArea').value, false)
                } }
                onFocus={e => {
                  e.target.style.height = "";
                  e.target.style.height = e.target.scrollHeight + "px"
                } }
                />
              <button onClick={ (e) => {
                  updateNotes(document.getElementById('notesArea').value, true)
              }}>Save</button>
              </React.Fragment>
            )
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
                <p className="text-lg">
                  { state.data.NPCs[key].name }
                  <button onClick={ () => deleteAssetFromMap('NPCs', key) }>Delete</button>
                  <input
                    className="w-8 m-2 rounded-md text-2xl"
                    name="layer"
                    type="number"
                    value={getLayer('NPCs', key)}
                    onChange={e => updateLayer('NPCs', key, e.target.value)}
                  />
                </p>)
              })
            }
            { !!tabStatus.tAssetsFMaps &&
            Object.keys(state.data.Images).map((key) => {
                return (
                  <p className="text-lg">
                    { state.data.Images[key].name }
                    <button onClick={ () => deleteAssetFromMap('Images', key) }>Delete</button>
                    <input
                      className="w-8 m-2 text-2xl rounded-md"
                      name="layer"
                      type="number"
                      value={getLayer('Images', key)}
                      onChange={e => updateLayer('Images', key, e.target.value)}
                    />
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
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    objectFit: 'contain'
                  } }>NPC - { campaignAssets.NPCs[id].name }</h1>
                    <h3>Is alive?: { campaignAssets.NPCs[id].alive.toString() }</h3>
                      <ol>
                        <li>
                          { campaignAssets.NPCs[id].bio }
                        </li>
                        <li>
                          { campaignAssets.NPCs[id].details }
                        </li>
                      </ol>
                    <button onClick={() => addAssetToMap(id, 'npc')}>Add</button>
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
                    <button onClick={() => addAssetToMap(id, 'img')}>Add</button>
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