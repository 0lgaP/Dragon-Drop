import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import CampContext from "../../providers/CampProvider";

const MapList = () => {
  const { c_id, u_id } = useParams()
  const {campaign, setCampaign} = useContext(CampContext)

  const [maps, setMaps] = useState([])

  useEffect(() => {
    axios.get(`/users/0/campaigns/${campaign}/maps`).then(res => setMaps(res.data))
  }, [])
  console.log('hello', maps)

  return (
    <React.Fragment>
      {maps.length && maps.map(map => {
        return <Link to={`maps/${map.id}`}>{ map.name } <img src={ map.background } alt={map.name} /></Link>
      }) }
    </React.Fragment>
  );
}

export default MapList;