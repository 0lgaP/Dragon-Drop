import React from "react";
import StoryCardsListPull from "./StoryCardsListPull";

export default function StoryCardContainerPull(props) {

  return (
    <section className="card grid-cols-2">
      <StoryCardsListPull {...props}/>
    </section>
  )
}
