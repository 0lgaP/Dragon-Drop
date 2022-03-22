import React from "react";
import { Link, useParams } from 'react-router-dom';
import Map from "../../components/map";

const MapDetails = () => {
  const { u_id, c_id, m_id } = useParams();

  return <Map mapId={m_id} />;
}

export default MapDetails;