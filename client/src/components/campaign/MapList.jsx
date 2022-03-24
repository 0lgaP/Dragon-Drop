import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import CampContext from "../../providers/CampProvider";
import './MapList.css'

const MapList = () => {
  const { c_id, u_id } = useParams()
  const {campaign, setCampaign} = useContext(CampContext)

  const [maps, setMaps] = useState([])

  useEffect(() => {
    axios.get(`/users/0/campaigns/${campaign()}/maps`).then(res => setMaps(res.data))
  }, [])

  return (
    <div className="map-container">
      {maps.length && maps.map(map => {
        return (
          <div className="map-card">
            <h2>{ map.name }</h2>
            <Link to={ `maps/${map.id}` }>
              <img className="map-thumbnail" src={ map.background } alt={ map.name } />
            </Link>
          </div>
        )
      }) }
    </div>
  );
}

export default MapList;