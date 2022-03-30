import React, {useState, useEffect, useContext} from 'react';
import Form from "./Form";
import {DndStoryCardContainer} from './DndStoryCardContainer';
import axios from '../../../api/axios';
import dataHelper from '../../../hooks/dataHelpers';
import AuthContext from '../../../providers/AuthProvider';
import CampContext from '../../../providers/CampProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Empty from './Empty';



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

  const [dndStory, setDndStory] = useState('');
  
  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      const storyCardsObject = dataHelper().convertArrayToObject(res.data, 'id')
      setStories(storyCardsObject)
      setDndStory(res.data)
    })
  }, [])



  const onEdit = (story) => {
    setCurrentStory(story)
    setView(viewObj.EDIT)
  }
  
console.log("CS", currentStory)

  return(

    <div className="flex m-2">
      <section className='w-1/3 flex justify-center  '>
        <article className='fixed w-1/3 '>
          {(view === viewObj.CREATE && setDndStory) ? <Form css='create' setStories={setStories} setDndStory={setDndStory} view={view}
            viewObj={viewObj} setView={setView} setCurrentStory={setCurrentStory} currentStory={currentStory}/> :
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
      css='edit_form'
      setCurrentStory={setCurrentStory}/>}
        </article>
      </section>
      <section className='w-2/3 '>
      <DndProvider backend={HTML5Backend}>
      {dndStory.length > 0 && <DndStoryCardContainer
      allStories={allStories} 
      setStories={setStories}
      dndStory={dndStory}
      setDndStory={setDndStory}
      onEdit={onEdit}
      id={currentStory.id} 
      />}
      {dndStory.length === 0 && <Empty/>}
      </DndProvider>

    </section>
    </div>

  );
}
