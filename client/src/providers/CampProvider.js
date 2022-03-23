import {createContext, useState, useEffect } from 'react';


const CampContext = createContext({});

export const CampProvider = (props) => {

  const [campaign, setCampaign] = useState('');
  const [story, setStory] = useState([]);

  return (
    <CampContext.Provider value={{campaign, setCampaign}}>
      {props.children}
    </CampContext.Provider>
  )
}

export default CampContext;