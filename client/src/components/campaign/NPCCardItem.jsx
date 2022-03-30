import React from "react";

const NPCCardItem = (props) => {
  return (
    <div className="bg-secondary text-gunmetal p-5 m-6 mx-auto  w-80 max-w-lg rounded-xl opacity-inherit">
      <div className="npc-card--header flex flex-row justify-start content-center h-10 pb-5 mb-4">
        <img
          className="rounded-full border-primary border-2 w-20 h-20 mr-8 object-cover object-top"
          src={props.image}
          alt={props.name}
        ></img>
        <h5 className="mt-5 text-2xl">{props.name}</h5>
      </div>
      <div className="npc-card--content flex flex-column flex-wrap justify-start m-2 mt-14 font-merriweather text-lg">
        <p className="m-2">{props.bio}</p>
        <p className="m-2">{props.details}</p>
      </div>
      {props.children}
    </div>
  
  );
};

export default NPCCardItem;
