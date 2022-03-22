import { createContext, useState } from 'react';

export const storyCardContext = createContext();

export default function StoryCardProvider(props) {
  const [npc, setNpc] = useState(null);
  const [map, setMap] = useState(null);
  const [card, setCard] = useState(null);

  


  const storyCardData = { npcs, maps, cards }
}