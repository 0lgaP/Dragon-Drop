import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../providers/AuthProvider";
import CampContext from "../../providers/CampProvider";
import NPCCardItem from "./NPCCardItem";

const MapCreate = (props) => {
  const [mapName, setMapName] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [bio, setBio] = useState("");
  const { campaign } = useContext(CampContext);
  const { auth } = useContext(AuthContext);

  async function saveToDb() {
    const map = await axios.post(
      `/users/${auth.user_id}/campaigns/${campaign()}/maps`,
      {
        name: mapName,
        imgUrl: mapUrl,
        bio,
      }
    );
    setMapName("");
    setMapUrl("");
    setBio("");
    props.addMap(map.data);
    props.toggleEdit("v");
  }

  return (
    <>
      <div className="bg-primary m-6 p-4 rounded-xl ms-auto">
        <h1 className="text-2xl text-textcolor p-2">Create a new Map!</h1>
        <div>
          <label>
            <p className="text-textcolor text-lg p-2 m-2">Name</p>
            <input
              className="border-2 border-secondary rounded-md bg-bkgd mb-4 w-60 text-textcolor"
              type="text"
              value={mapName}
              onChange={(e) => setMapName(e.target.value)}
            />
          </label>
          <label>
            <p className="text-textcolor text-lg p-2 m-2">Bio</p>
            <textarea
              className="border-2 border-secondary rounded-md bg-bkgd mb-4 w-60 text-textcolor"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <label>
            <p className="text-textcolor text-lg p-2 m-2">
              Background Image URL
            </p>
            <input
              className="border-2 border-secondary rounded-md bg-bkgd mb-4 text-textcolor"
              type="text"
              value={mapUrl}
              onChange={(e) => setMapUrl(e.target.value)}
            />
          </label>
          <div className="flex flex-row justify-center p-4">
            <button
              onClick={saveToDb}
              className="bg-secondary text-header rounded-md border-primary border-2 m-2 px-6 py-2"
              type="submit"
            >
              Submit
            </button>
            <button
              onClick={() => props.toggleEdit("v")}
              className="bg-secondary text-header rounded-md border-primary border-2 m-2 px-6 py-2"
              type="submit"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapCreate;
