import { createContext, useContext, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import useFetch from '../../../../hooks/useFetch';
import AuthContext from '../../../../providers/AuthProvider';

export const storyCardContext = createContext();

export default function StoryCardProvider(props) {
  const { auth } = useContext(AuthContext);
  const userAuth = window.localStorage.getItem("user_id")
  
  const [npc, setNpc] = useState(null);
  const [map, setMap] = useState(null);
  const [card, setCard] = useState(null);

  



  const storyCardData = { auth, userAuth }

  return (
    <storyCardContext.Provider value={storyCardData}>
      {props.children}
    </storyCardContext.Provider>
  )

}