import {createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const CampContext = createContext({});

export const CampProvider = (props) => {

  const [campaign, setCampaign] = useState([]);


  return (
    <CampContext.Provider value={{campaign, setCampaign}}>
      {props.children}
    </CampContext.Provider>
  )
}

export default CampContext;