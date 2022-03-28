import React, { useEffect, useContext } from "react";
// import DndStoryCardsList from "./DndStoryCardsList";

// export default function DndStoryCardContainer(props) {

//   return (
//     <section className="card">
//       <DndStoryCardsList {...props} />
//     </section>
//   )
// }
import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';
import axios from "../../../api/axios";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
const style = {
    width: 400,
};
    // allStories={allStories} 
    // setStories={setStories}
    // dndStory={dndStory}
    // setDndStory={setDndStory}
    // onEdit={onEdit} 
export const DndStoryCardContainer = memo(function DndStoryCardContainer(props) {
    const { allStories, setStories, onEdit } = props;
      const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id
  const address = `/users/${u_id}/campaigns/${campaign()}`
  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: '',
    completed: false
  })
  
  const [state, setState] = useState({
    npcs: [],
    maps: [],
  })
// console.log("NPCS state.npcs", state.npcs)
  useEffect(() => {
    Promise.all([
      axios.get(`${address}/npcs`),
      axios.get(`${address}/maps`),
    ]).then((all) => {
      setState(prev => {
        return {...prev,
        npcs: all[0].data,
        maps: all[1].data,
      }});
    });
  }, []);

  const onDelete = (event, id) => {
  event.preventDefault()
  axios.delete(`${address}/story/${id}`)
  .then(() => {
      props.setDndStory(prev => {
            const newState = [...prev];
              for (const index in newState) {
                  if (newState[index].id !== id) continue;
                  newState.splice(index, 1)
                  return newState
              }
          })
  })
  .catch((err) => console.log("Error From StoryCardList Component", err))
}

const onComplete = (event, id, card) => {
  event.preventDefault()
  story.map_id = card.maps_id
  story.npc_id = card.npcs_id
  story.text = card.story_card_text
  story.completed = true
  setStory(story)
  axios.put(`${address}/story/${id}`, story)
      .then(() => {
          props.setDndStory(prev => {
            const newState = [...prev];
              for (const index in newState) {
                  if (newState[index].id !== id) continue;
                  newState[index].completed = true
                  return newState
              }
          })
    // setStories(prev => {
    //   const newState = {...prev}
    //   delete newState[id]
    //   return newState
    // })
  })
}

const getNPC = (id, objArr) => {
  const found = objArr.find((element) => element.id === id)
  const index = objArr.indexOf(found)
  return found && ({...found, index})
}

const onKill = (event, card) => {
  event.preventDefault()
  const getNpc = getNPC(card, state.npcs)
  const NPC = state.npcs[getNpc.index]
  let toggle = NPC.alive ? false : true
  NPC.alive = toggle
  //change what the name of the put request is//
  axios.put(`${address}/npcs/${NPC.id}/edit`, {...NPC,
    imageURL: NPC.img
  })
    .then((res) => {
      console.log(`SUCCESS KILL`, res.data)
      const npcUpdate = res.data
      setState(prev => {
        return {
          ...prev,
          NPC: {...npcUpdate}
        }
      })
    })
    .catch((err) => console.log("Error From FORM's KILL Client Call", err))
}
  // console.log("dndSTATE", props.dndStory)
    // const [cards, setCards] = useState(props.dndStory);
    const cards = props.dndStory;
    const setCards = props.setDndStory;
    // console.log("CARDS", cards)
    const findCard = useCallback((id) => {
        const card = cards.filter((c) => `${c.id}` === id)[0];
        return {
            card,
            index: cards.indexOf(card),
        };
    }, [cards]);
    const moveCard = useCallback((id, atIndex) => {
        const { card, index } = findCard(id);
        console.log("movingBEFORE", cards)
        setCards(update(cards, {
            $splice: [
                [index, 1],
                [atIndex, 0, card],
            ],
        }));

    }, [findCard, cards, setCards]);
    useEffect(() => {
      for (let cardIndex in cards){
        axios.put(`/users/:id/campaigns/:c_id/story/${cards[cardIndex].id}/order`, {order: cardIndex})
      }
    }, [cards])
    
    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
    return (<div ref={drop} style={style}>
        {cards.map((card) => {
            if (card.completed) return null;
            return (<Card key={card.id} id={`${card.id}`} text={card.story_card_text} moveCard={moveCard} findCard={findCard}
                npcId={card.npcs_id}
                mapId={card.maps_id}
                allNpcs={state.npcs}
                allMaps={state.maps}
                order={card.order_num}
                onDelete={(event) => onDelete(event, card.id)}
                onEdit={() => onEdit(card)}
                onComplete={(event) => { onComplete(event, card.id, card) }}
                onKill={(event) => onKill(event, card.npcs_id)} />
            )
        })}
		</div>);
});

