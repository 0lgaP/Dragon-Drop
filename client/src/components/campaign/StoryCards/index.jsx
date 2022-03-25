
import React, {useState} from 'react';
import Form from "./Form";
import StoryCardContainer from './StoryCardContainer';
import StoryCardContainerPull from './StoryCardContainerPull';

export default function StoryCards() {
  const [allStories, setStories] = useState('');


  return(
    <div className="grid-cols-3 flex">
    <Form allStories={allStories} setStories={setStories}/>
    <StoryCardContainer allStories={allStories} setStories={setStories}/>
    <StoryCardContainerPull/>
    </div>
  );
}