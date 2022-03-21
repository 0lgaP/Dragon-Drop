import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch"

export default function StoryCard(props) {
  const [card, setCard] = useState(["Card"])

  const address = '/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/story' ;
  const { data: user, error, isPending } = useFetch(`http://localhost:8082${address}`);

  useEffect(() => { loadInitialStoryCards() 
  
    async function loadInitialStoryCards() {
      const initialStoryCards = await user
      if (user) setCard(initialStoryCards)
    }
  }, [{card}])

  return (
    <section className="card">
    </section>
  )
}
