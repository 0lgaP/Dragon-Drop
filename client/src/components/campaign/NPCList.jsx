import { React, useState, useEffect, useContext } from "react";
import NPCListItem from "./NPCListItem";
import AuthContext from "../../providers/AuthProvider";
import CampContext from "../../providers/CampProvider";
import axios from "axios";

const NPCList = (props) => {
  const { auth } = useContext(AuthContext);
  const { campaign_id, campaign } = useContext(CampContext);
  const [npcs, setNPCs] = useState([]);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [bio, setBio] = useState("");
  const [details, setDetails] = useState("");
  // const campaignID = campaign()
  // const campaignID = JSON.parse(rawCampaignID)
  // console.log(`cid from local stor`, rawCampaignID);
  const address = `/users/${auth.user_id}/campaigns/${campaign()}/npcs`;
  // console.log(`address: `, address)
  useEffect(() => {
    axios.get(`http://localhost:8082${address}`).then((res) => {
      setNPCs(res.data);
    });
  }, []);
  const list = npcs.map((character) => {
    // console.log(`npc id from map func`, character.id)
    return (
      <NPCListItem
        id={character.id}
        image={character.img}
        name={character.name}
        bio={character.bio}
        details={character.details}
        alive={character.alive}
      />
    );
  });

  const handleSubmit = async (e) => {
    try {
      await axios.post(address, { name, imageURL, bio, details });
      setName("");
      setImageURL("");
      setBio("");
      setDetails("");
      window.location.reload(true);
    } catch (err) {}
  };

  const cancelSubmit = (e) => {
    e.preventDefault();
    setName("");
    setImageURL("");
    setBio("");
    setDetails("");
  };

  return (
    <section className="flex flex-row">
      <div className="bg-primary m-6 p-4 rounded-xl">
        <h1 className="text-2xl text-textcolor p-2">Create a new NPC!</h1>
        <form className="p-2 m-2 font-cinzel">
          <label className="">
            <p className="text-textcolor text-lg p-2 m-2">Name</p>
            <input
              className="border-2 border-secondary rounded-md bg-bkgd mb-4 w-60 text-textcolor"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label className="">
            <p className="text-textcolor text-lg p-2 m-2">Image URL</p>
            <input
              className="border-2 border-secondary rounded-md bg-bkgd mb-4 text-textcolor"
              type="text"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
            />
          </label>
          <label>
            <p className="text-textcolor text-lg p-2 m-2">Bio</p>
            <input
              className="border-2 border-secondary rounded-md bg-bkgd mb-4 h-40 w-60 text-textcolor"
              type="text"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </label>
          <label>
            <p className="text-textcolor text-lg p-2 m-2">DM Notes</p>
            <input
              className="border-2 border-secondary rounded-md bg-bkgd mb-4 w-60 h-20 text-textcolor content-start"
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            />
          </label>
          <div className="flex flex-row justify-center p-4">
            <button
              className="bg-secondary text-header rounded-md border-primary border-2 m-2 px-6 py-2"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-secondary text-header rounded-md border-primary border-2 m-2 px-6 py-2"
              type="submit"
              onClick={cancelSubmit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="npc-list flex flex-row flex-wrap gap-6">{list}</div>
    </section>
  );
};

export default NPCList;
