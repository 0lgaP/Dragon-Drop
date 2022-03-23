import React from "react";

const Home = () => {
return (
  <section className="flex flex-row justify-evenly m-3">
    <div className="bg-primary text-textcolor flex flex-column px-20">
      <h1 className="text-5xl p-10">Maps</h1>
    </div>
    <div className="bg-primary text-textcolor flex flex-column px-20">
      <h1 className="text-5xl p-10">Story</h1>
    </div>
    <div className="bg-primary text-textcolor flex flex-column px-20">
      <h1 className="text-5xl p-10">Party</h1>
    </div>
    <div className="bg-primary text-textcolor flex flex-column px-20">
      <h1 className="text-5xl p-10">NPCs</h1>
    </div>
  </section>

 
)

}

export default Home;