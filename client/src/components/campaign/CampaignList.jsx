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
  const [hide, setHide] = useState(true)
  const { auth } = useContext(AuthContext);

  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)

  const address = `/users/${userAuth}/campaigns`;

  // let clicked = false;
  // ADD VISIBLE STYLE TO FORM WITH FUNCTION //
  // const hiddenStyle = "hidden flex flex-row bg-gunmetal m-6 p-4 h-18 rounded-xl content-center w-fit"
  // const visibleStyle = "flex flex-row bg-gunmetal m-6 p-4 h-18 rounded-xl content-center w-fit";

  // const makeFormVisible = () => {
  //   if (clicked === true) {
  //     clicked = false
  //     console.log(`setting to hidden style`)
  //     setStyle(hiddenStyle)
  //   }
  //   else {
  //     clicked = true
  //     console.log(`setting to visible style`)
  //     setStyle(visibleStyle)
  //   }
  //   console.log(clicked)
  // }

  function toggleForm() {
    setHide((prev) => !prev);
  }


  useEffect(() => {
    axios.get(`${address}`)
      .then((res) => {
        setCampaigns(res.data)
      })
  }, [])

  const handleSubmit = async () => {

    try {
      await axios.post(address, { name })
      toggleForm();
      setName('');
    }
    catch (err) {
      
    }
  }


  return (
    <div>
      <div className="flex flex-row justify-start">
        <div className="p-8 px-4 m-6 text-xl text-textcolor bg-header w-80 rounded-xl h-18 content-center">
         <button className="flex flex-row items-center content-center" onClick={toggleForm}><div className="p-4">+</div><div> Create a New Campaign!</div></button>
        </div>
        {!hide  && <div>
          <form className="flex flex-row bg-gunmetal m-6 p-4 h-18 rounded-xl content-center w-fit" onSubmit={handleSubmit}
>
            <label className="flex flex-row">
              <p className="text-textcolor content-center text-xl m-4 pr-4">Name: </p>
              <input className="border-2 border-secondary rounded-md bg-bkgd m-4 w-80 h-8 text-textcolor" type ="text" onChange={e => setName(e.target.value)} value={name} />
            </label>
            <button className="bg-secondary text-header rounded-md border-primary border-2 m-2 ml-10 px-6 py-2 h-fit content-center" type ="submit">Submit</button>
          </form>
        </div>}
      </div >
    <section>
      <div className="card__container text-gunmetal text-2xl rounded-lg p-6 px-10 m-6">
        {campaigns.map(camp =>
          <div className="bg-secondary rounded-xl m-4"><CampaignListItem id={camp.id} name={camp.name} /></div>
        )}
      </div>
    </section>
     </div>
  )
}

export default CampaignList;