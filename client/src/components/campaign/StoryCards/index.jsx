
import React from 'react';
import Form from "./Form";
import StoryCardContainer from './StoryCardContainer';
import StoryCardContainerPull from './StoryCardContainerPull';

export default function StoryCards() {

  return(
    <div className="grid-cols-3 flex">
    <Form/>
    <StoryCardContainer/>
    <StoryCardContainerPull/>
    </div>
  );
}