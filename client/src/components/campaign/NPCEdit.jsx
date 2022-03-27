import { React, useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import NPCListItem from './NPCListItem';
import AuthContext from '../../providers/AuthProvider';
import CampContext from '../../providers/CampProvider';
import axios from 'axios';

const NPCList = (props) => {
  const { auth } = useContext(AuthContext);
  const {campaign} = useContext(CampContext);
  
  const [npcs, setNPCs] = useState([])
  const [npc, setNPC] = useState();
  const [name, setName] = useState()
  const [imageURL, setImageURL] = useState('')
  const [bio, setBio] = useState()
  const [details, setDetails] = useState()
  const [alive, setAlive] = useState(true);
  const address = `/users/${auth.user_id}/campaigns/${campaign()}/npcs`;
  const npcID = window.localStorage.getItem("npc_id");
  const u_id = JSON.parse(window.localStorage.getItem("user_id"));
  const c_id = window.localStorage.getItem("campaign_id");
  
  useEffect(() => {
    // LOAD ALL NPC CARDS
    axios.get(`${address}`)
    .then((res) => {
      setNPCs(res.data)
    })
    .catch((err) => {
      console.log(err.message)
    })
    // FETCH SELECTED NPC TO POPULATE FORM
    axios.get(`${address}/${npcID}`)
    .then((res) => {
      setName(res.data.name)
      setImageURL(res.data.img)
      setBio(res.data.bio)
      setDetails(res.data.details)
      setNPC(res.data)
    })
  }, [])

  const list = npcs.map((character) => {
      return (
      <NPCListItem id={character.id} image={character.img} name={character.name} bio={character.bio} details={character.details} alive={character.alive} />
      )
  })

  const handleSave = ()=> { 
  // UPDATE ENTRY IN DB
      axios.put(`${address}/${npcID}/edit`, { name, bio, alive, details, imageURL })
      .then((res) => {
        setName('');
        setImageURL('');
        setBio('');
        setDetails('');
      })
      
      // window.location.reload(true);
  }

  const cancelSubmit = (e) => {
    e.preventDefault();
      setName('');
      setImageURL('');
      setBio('');
      setDetails('');
  }

  return (
    <section className="flex flex-row">
      <div className="bg-primary p-4 m-6 rounded-xl">
        <h1 className="text-2xl text-textcolor p-2">Edit NPC!</h1>
      <form className="p-2 m-2" onSubmit={handleSave}>
          <label className="">
            <p className="text-textcolor text-lg p-2 m-2">Name</p>
            <input className="border-2 border-secondary rounded-md bg-bkgd mb-4" placeholder={name} type="text" onChange={e => setName(e.target.value)} value={name} />
          </label>
          <label className="">
            <p className="text-textcolor text-lg p-2 m-2">Image URL</p>
            <input className="border-2 border-secondary rounded-md bg-bkgd mb-4" type="text" onChange={e => setName(e.target.value)} value={imageURL} />
          </label>
          <label>
            <p className="text-textcolor text-lg p-2 m-2">Bio</p>
            <input className="border-2 border-secondary rounded-md bg-bkgd mb-4" placeholder={bio} type="text" onChange={e => setBio(e.target.value)} value={bio} />
          </label>
          <label>
            <p className="text-textcolor text-lg p-2 m-2">DM Notes</p>
            <input className="border-2 border-secondary rounded-md bg-bkgd mb-4" placeholder={details} type="text" onChange={e => setDetails(e.target.value)} value={details} />
          </label>
          <div className="flex flex-row justify-center p-4">
            <button className="bg-secondary text-header rounded-md border-primary border-2 m-2 px-6 py-2" type="submit">Save</button>
            <Link to={`/users/${u_id}/campaigns/${c_id}/npcs`}><button className="bg-secondary text-header rounded-md border-primary border-2 m-2 px-6 py-2">Cancel</button></Link>
          </div>
        </form>
      </div>
      <div className="npc-list flex flex-row flex-wrap mx-4">
        {list}
      </div>
    </section>
  )
  
}

export default NPCList;