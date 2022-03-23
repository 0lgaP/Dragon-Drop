import React, { useState, useEffect } from "react";
import './Card.css';
import './Button.css';
// import AuthContext from "../../../providers/AuthProvider";
// import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";


export default function ShowStoryCards() {
  const [story, setStory] = useState('');
  // const [card, setCard] = useState('');
  // const { auth } = useContext(AuthContext);
  // const { campaign } = useContext(CampContext);

  // const u_id = auth.user_id
  // const c_id = campaign
  const u_id = '4896e484-a6d7-11ec-b909-0242ac120002'
  const c_id = 'b819024a-4fd2-4316-8697-411ad293bb71'
  const address = `http://localhost:8082/users/${u_id}/campaigns/${c_id}`


  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      setStory(res.data)
    })
  }, [setStory])

console.log("STORY", story)

  return (
    <section className="card">

    <form autoComplete="off">
      
      <article className="card__container">
        <button className="button confirm">
          Edit
        </button>
        <button className="button cancel" >
          Toggle 💀
        </button>
      </article>

    </form>

</section>

  )
}