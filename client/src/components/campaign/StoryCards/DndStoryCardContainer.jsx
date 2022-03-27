import React from "react";
import DndStoryCardsList from "./DndStoryCardsList";

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
const style = {
    width: 400,
};

// allStories={allStories} 
// setStories={setStories}
const ITEMS = [
    {
        id: 1,
        text: 'Write a cool JS library',
    },
    {
        id: 2,
        text: 'Make it generic enough',
    },
    {
        id: 3,
        text: 'Write README',
    },
    {
        id: 4,
        text: 'Create some examples',
    },
    {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it',
    },
    {
        id: 6,
        text: '???',
    },
    {
        id: 7,
        text: 'PROFIT',
    },
];
// dndStory={dndStory}
// setDndStory={setDndStory}
// onEdit={onEdit} 
export const DndStoryCardContainer = memo(function DndStoryCardContainer(props) {
  console.log("dndSTATE", props.dndStory)
    const [cards, setCards] = useState(props.dndStory);
    console.log("CARDS", cards)
    const findCard = useCallback((id) => {
        const card = cards.filter((c) => `${c.id}` === id)[0];
        return {
            card,
            index: cards.indexOf(card),
        };
    }, [cards]);
    const moveCard = useCallback((id, atIndex) => {
        const { card, index } = findCard(id);
        setCards(update(cards, {
            $splice: [
                [index, 1],
                [atIndex, 0, card],
            ],
        }));
    }, [findCard, cards, setCards]);
    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
    return (<div ref={drop} style={style}>
			{cards.map((card) => (<Card key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard}/>))}
		</div>);
});

