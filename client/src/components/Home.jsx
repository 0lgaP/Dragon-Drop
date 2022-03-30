import React from "react";

const Home = () => {
  return (
    <section className="">
      <div className="font-inputFont rounded-xl m-4 p-6 text-gunmetal text-3xl bg-secondary/40">
        <h1 className="m-6">Welcome, lovers of Dungeons and Dragons!</h1>
        <h2 className="mb-10">All of your storytelling dreams have come true! With Dragon Drop, you can create your own custom campaings for table-top RPGs. Design your own maps for gameplay, write your storyline, bring NPCs to life and more!</h2>
      </div>
      <div className="flex flex-row m-3 justify-evenly">
      <div className="bg-primary rounded-xl text-textcolor flex flex-col tracking-wider p-6 m-4 w-1/4">
        <h1 className="text-4xl px-20 p-10">Maps</h1>
        <p className="font-inputFont text-lg break-normal text-justify">Our Drag'n'Drop system for map creation allows users to upload a custom image to use as a background. </p>
        <img className="my-4" src="https://i.imgur.com/Uxor8hc_d.jpg?maxwidth=520&shape=thumb&fidelity=high"></img>
        <p className="font-inputFont text-lg break-normal text-justify">Other images can be loaded in as assets to place on the map in a layering position mechanic. Maps are fully customisable, allowing GMs to tag story cards and NPCs to their maps for better workflow.</p>
      </div>
      <div className="bg-primary rounded-xl text-textcolor flex flex-col tracking-wider p-6 m-4 w-1/4">
        <h1 className="text-4xl px-20 p-10">Story</h1>
        <p className="font-inputFont text-lg break-normal text-justify">Build your story from the ground up with our storytelling tab. </p>
        <img className="my-4" src="https://i.imgur.com/MtM9i6H_d.jpg?maxwidth=520&shape=thumb&fidelity=high"></img>
        <p className="font-inputFont text-lg break-normal text-justify">Stories are written in small pieces, and these pieces can be tagged to a specific map or NPC that is part of your campaign. Mark stories as complete when those pieces are used in-game, and they'll move to your archived history for future reference.</p>
      </div>
      <div className="bg-primary rounded-xl text-textcolor flex flex-col tracking-wider p-6 m-4 w-1/4">
        <h1 className="text-4xl px-20 p-10">Party</h1>
        <img></img>
        <p className="font-inputFont text-lg break-normal text-justify">Other players on the app can be added as party members. Consider this your player rolodex as each player entry links to their stats sheet, allowing you to check stats and player conditions on the fly.</p>
      </div>
      <div className="bg-primary rounded-xl text-textcolor flex flex-col tracking-wider p-6 m-4 w-1/4">
        <h1 className="text-4xl px-20 p-10">NPCs</h1>
        <p className="font-inputFont text-lg break-normal text-justify">Create your very own NPC characters in the app to add depth to your adventure. Give them a name, a profile image, a short biography, and you're ready to roll!
        </p> 
        <img className="my-4" src="https://i.imgur.com/2Yry2zc_d.jpg?maxwidth=520&shape=thumb&fidelity=high"></img>
        <p className="font-inputFont text-lg break-normal text-justify">Each character entry also tracks life status, whether that NPC is still in play or whether they've met their demise.</p>
      </div>
      </div>
    </section>
  )

}

export default Home;