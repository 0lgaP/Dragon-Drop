import { React, useContext, useEffect, useState } from "react";
import CampContext from "../../providers/CampProvider";
import { useParams } from "react-router-dom";
import NPCCardItem from "../campaign/NPCCardItem";
import StoryCardItem from "./StoryCards/StoryCardItem";
import axios from "axios";

const CampaignDetails = (props) => {
  const { setCampaign, campaign } = useContext(CampContext);
  const { c_id } = useParams();
  const user_id = window.localStorage.getItem("user_id");
  const u_id = JSON.parse(user_id);
  const [state, setState] = useState({
    npcs: [],
    maps: [],
    players: [],
    storyCards: [],
    deadNPCs: [],
    deadStoryCards: [],
  });
  setCampaign(c_id);

  useEffect(() => {
    Promise.all([
      axios.get(`/users/${u_id}/campaigns/${c_id}/maps`),
      axios.get(`/users/${u_id}/campaigns/${c_id}/npcs`),
      axios.get(`/users/${u_id}/campaigns/${c_id}/story`),
    ]).then((res) => {
      setState({
        maps: res[0].data,
        npcs: res[1].data,
        storyCards: res[2].data,
      });
    });
  }, []);
  const aliveNPCs = state.npcs.filter((char) => char.alive === true);
  const deadNPCs = state.npcs.filter((char) => char.alive === false);
  const unusedStories = state.storyCards.filter(
    (story) => story.completed === false
  );
  const deadStories = state.storyCards.filter(
    (story) => story.completed === true
  );

  const npcList = aliveNPCs.map((character) => {
    return (
      <NPCCardItem
        id={character.id}
        image={character.img}
        name={character.name}
        bio={character.bio}
        details={character.details}
        alive={character.alive}
      />
    );
  });

  const [storyCardHackery, setStoryCardHackery] = useState({
    npcs: [],
    maps: [],
  });
  // console.log("NPCS state.npcs", state.npcs)
  useEffect(() => {
    Promise.all([
      axios.get(`/users/0/campaigns/${campaign()}/npcs`),
      axios.get(`/users/0/campaigns/${campaign()}/maps`),
    ]).then((all) => {
      setStoryCardHackery((prev) => {
        return { ...prev, npcs: all[0].data, maps: all[1].data };
      });
    });
  }, []);

  const storyCardList = unusedStories.map((card) => {
    return (
      <StoryCardItem
        key={card.id}
        npcId={card.npcs_id}
        allMaps={storyCardHackery.maps}
        allNpcs={storyCardHackery.npcs}
        text={card.story_card_text}
        order={card.order_num}
      />
    );
  });

  // const mapList = state.maps.map((map) => {
  //     return (
  //       <div className="map-card w-80 h-80 m-2 mt-4 rounded-xl p-2">
  //         <h2>{ map.name }</h2>
  //           <img className="map-thumbnail" src={ map.background } alt={ map.name } />
  //       </div>
  //     )
  // })

  const deadNPCList = deadNPCs.map((character) => {
    return (
      <div className="bg-bkgd m-6 p-0.5 rounded-xl opacity-75">
        <NPCCardItem
          id={character.id}
          image={character.img}
          name={character.name}
          bio={character.bio}
          details={character.details}
          alive={character.alive}
        />
      </div>
    );
  });

  const deadStoryCardList = deadStories.map((card) => {
    return (
      <StoryCardItem
        npcId={card.npcs_id}
        allMaps={storyCardHackery.maps}
        allNpcs={storyCardHackery.npcs}
        key={card.id}
        text={card.story_card_text}
        order={card.order_num}
      />
    );
  });

  return (
    <section className="flex flex-column justify-center content-center">
      {/* <div className="m-2">
      <div className="">{mapList}</div>
    </div> */}
      <div className="bg-dragongreen/50 rounded-xl m-4 w-1/4">
        <h1 className="text-2xl m-4 text-textcolor p-2">Story Cards</h1>
        {storyCardList}
      </div>
      <div className="bg-gunmetal rounded-xl m-4 w-1/4">
        <h1 className="text-2xl m-4 text-textcolor p-2">Story History</h1>
        {deadStoryCardList}
      </div>
      <div className="bg-dragongreen/50 rounded-xl m-4">
        <h1 className="text-2xl m-4 text-textcolor p-2">NPCs in Play</h1>
        {npcList}
      </div>
      <div className="bg-gunmetal rounded-xl m-4">
        <h1 className="text-2xl m-4 text-textcolor p-2">💀 The Graveyard 💀</h1>
        {deadNPCList}
      </div>
    </section>
  );
};

export default CampaignDetails;
