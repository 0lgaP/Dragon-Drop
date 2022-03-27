import React from "react";
import DndStoryCardsList from "./DndStoryCardsList";

export default function Dnd_StoryCardContainer(props) {

  return (
    <section className="card">
      <DndStoryCardsList {...props} />
    </section>
  )
}
