import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../../../api/axios';
import AuthContext from '../../../../providers/AuthProvider';
import CampContext from '../../../../providers/CampProvider';

export const storyCardContext = createContext();

export default function StoryCardProvider(props) {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  
  const u_id = auth.user_id
  const c_id = campaign()
  const address = `http://localhost:8082/users/${u_id}/campaigns/${c_id}`

const [state, setState] = useState({
  npcs: [],
  maps: [],
  story: []
})




  useEffect(() => {
    Promise.all([
      axios.get(`${address}/npcs`),
      axios.get(`${address}/maps`),
      axios.get(`${address}/story`)
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        npcs: all[0].data,
        maps: all[1].data,
        story: all[2].data,
      }));
    });
  }, []);

  const storyCardData = { ...state }

  return (
    <storyCardContext.Provider value={storyCardData}>
      {props.children}
    </storyCardContext.Provider>
  )

}