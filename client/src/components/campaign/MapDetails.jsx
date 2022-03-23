import React from "react";
import { Link, useParams } from 'react-router-dom';
import Map from "../../components/map";
import useMapData from "../../hooks/useMapData";

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
    <React.Fragment>
    { Object.keys(state.data).length && <Map mapState={ state } /> }
    </React.Fragment>
  );
}

export default MapDetails;