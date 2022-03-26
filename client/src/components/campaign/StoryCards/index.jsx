
import React, {useState, useEffect, useContext} from 'react';
import Form from "./Form";
import StoryCardContainer from './StoryCardContainer';
import StoryCardContainerPull from './StoryCardContainerPull';
import axios from '../../../api/axios';
import dataHelper from '../../../hooks/dataHelpers';
import AuthContext from '../../../providers/AuthProvider';
import CampContext from '../../../providers/CampProvider';


const viewObj = {
  CREATE: 'CREATE',
  EDIT: 'EDIT'
}

export default function StoryCards() {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id

  const address = `/users/${u_id}/campaigns/${campaign()}`

  const [allStories, setStories] = useState('');

  const [view, setView] = useState(viewObj.CREATE);
  const [currentStory, setCurrentStory] = useState({});

  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      const storyCardsObject = dataHelper().convertArrayToObject(res.data, 'id')
      setStories(storyCardsObject)

    })
  }, [])

  const onEdit = (story) => {
    setCurrentStory(story)
    setView(viewObj.EDIT)
    console.log("VIEW", view)
  }

console.log("CURRENT STORY", currentStory)

  return(
    <div className="grid-cols-3 flex">
    { view === viewObj.CREATE ? <Form setStories={setStories}/> :
    <Form text={currentStory.story_card_text}
    id={currentStory.id} 
    npc={currentStory.npcs_id} 
    map={currentStory.maps_id} 
    setStories={setStories}
    view={view}
    viewObj={viewObj}
    setView={setView}/>}
    <StoryCardContainer allStories={allStories} setStories={setStories} onEdit={onEdit} />
    {/* <StoryCardContainerPull allStories={allStories} setStories={setStories}/> */}
    </div>
  );
}