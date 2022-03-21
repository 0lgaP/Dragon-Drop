import React from "react";
import Form from "./Form";
import ShowStoryCards from "./ShowStoryCards";

//http://localhost:3002/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/story

export default function StoryCards() {

  return(
    <div className="grid-cols-3 flex">
    <Form/>
    <ShowStoryCards/>
    </div>
  );
}