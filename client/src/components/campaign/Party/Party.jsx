import { PlayerList } from "./PlayerList";

export const Party = () => {
  return (
    <section>
      <div className="bg-primary rounded-xl text-textcolor m-2">
        <h1 className="text-2xl m-4 p-5">Party Details</h1>
      </div>
      <div>
        {/* IMAGES HERE - BASE , CARDS - STRETCH */}
        <PlayerList />
      </div>
    </section>
  );
};
