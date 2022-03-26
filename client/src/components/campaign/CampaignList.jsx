import { React, useContext, useState, useEffect } from "react";
import AuthContext from "../../providers/AuthProvider";
// import CampContext from "../../providers/CampProvider";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import CampaignListItem from "./CampaignListItem";


const CampaignList = () => {
  // dm_id, id, name
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("")
  const { auth } = useContext(AuthContext);

  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)

  const address = `/users/${userAuth}/campaigns`;

  useEffect(() => {
    axios.get(`${address}`)
      .then((res) => {
        setCampaigns(res.data)
      })
  }, [])

  const handleSubmit = async (e) => {
    try {
      await axios.post(address, { name })
      setName('');
      window.location.reload(true);
    }
    catch (err) {
      
    }
  }


  return (
    <section>
      <div className="flex flex-row justify-start">
        <div className="p-4 px-6 m-6 text-xl text-textcolor bg-header w-fit rounded-xl h-16 content-center">
          <button>+ Create a New Campaign!</button>
        </div>
        <div className="flex flex-row bg-primary m-6 p-4 h-16 w-500 rounded-xl content-center">
        <form className="">
          <label>
            <p className="flex-row text-textcolor text-lg p-2 m-2">Name:</p>
            <input className="flex-row border-2 border-secondary rounded-md bg-bkgd mb-4 w-60 text-textcolor" type="text" onChange={e => setName(e.target.value)} value={name} />
          </label>
          <button className="bg-secondary text-header rounded-md border-primary border-2 m-2 ml-10 px-6 py-2 h-fit content-center" type="submit" onClick={handleSubmit}>Submit</button>
        </form>
</div>
      </div>
      <div className="card__container bg-secondary text-gunmetal text-2xl rounded-lg border-2 p-6 px-10 m-6">
        {campaigns.map(camp =>
          <CampaignListItem id={camp.id} name={camp.name} />
        )}
      </div>
    </section>
  )
}

export default CampaignList;