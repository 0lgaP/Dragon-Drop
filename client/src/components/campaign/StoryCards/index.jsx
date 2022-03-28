
import React, {useState, useEffect, useContext} from 'react';
import Form from "./Form";
// import StoryCardContainer from './StoryCardContainer';
import {DndStoryCardContainer} from './DndStoryCardContainer';
import axios from '../../../api/axios';
import dataHelper from '../../../hooks/dataHelpers';
import AuthContext from '../../../providers/AuthProvider';
import CampContext from '../../../providers/CampProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropDownListMap from './DropDownListMap';



const viewObj = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  EMPTY: 'EMPTY'
}

export default function StoryCards() {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id

  const address = `/users/${u_id}/campaigns/${campaign()}`

  const [allStories, setStories] = useState('');
  const [view, setView] = useState(viewObj.CREATE);
  const [currentStory, setCurrentStory] = useState({});
  // array of stories
  const [dndStory, setDndStory] = useState('');
  const [currentMap, setCurrentMap] = useState('');

  
  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      const storyCardsObject = dataHelper().convertArrayToObject(res.data, 'id')
      setStories(storyCardsObject)
      setDndStory(res.data)
    })
  }, [])

  // console.log("DND STORY STATE", dndStory)
  
  const onEdit = (story) => {
    setCurrentStory(story)
    setView(viewObj.EDIT)
    console.log("VIEW", view)
  }
  
  const setStoryPageMap = (e) => {
    const selectedMap = e.target.value;
    console.log("SetStoryPageMap set to:", selectedMap)
    setCurrentMap(selectedMap)
  }


  return(
    <div className="grid-cols-3 flex">
      <div>
        <DropDownListMap onChange={setStoryPageMap} value={currentMap}/>
      </div>
    { view === viewObj.CREATE ? <Form css='card' setStories={setStories}/> :
    <Form text={currentStory.story_card_text}
    id={currentStory.id} 
    npc={currentStory.npcs_id} 
    map={currentStory.maps_id} 
    setStories={setStories}
    view={view}
    viewObj={viewObj}
    setView={setView}
    dndStory={dndStory}
    setDndStory={setDndStory}
    css='card_edit'/>}
    {/* <StoryCardContainer
    allStories={allStories} 
    setStories={setStories} 
    onEdit={onEdit} 
      /> */}
      <section className="card">
<DndProvider backend={HTML5Backend}>
    {dndStory.length && <DndStoryCardContainer
    allStories={allStories} 
    setStories={setStories}
    dndStory={dndStory}
    setDndStory={setDndStory}
    onEdit={onEdit}
    currentMap={currentMap}
    />}
</DndProvider>
    </section>
    </div>
  );
}