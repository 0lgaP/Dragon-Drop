import React, { useState, useContext, useEffect } from "react";
import DropDownListMap from "./DropDownListMap";
import DropDownListNpc from "./DropDownListNpc";
import './Button.css';
import './Card.css';
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";





function Form() {
  const { auth } = useContext(AuthContext);
  const { campaign_id } = useContext(CampContext);

  const u_id = auth.user_id
  const c_id = campaign_id
  // console.log("PROVIDER", campaign_id)
  const address = `/users/${u_id}/campaigns/${c_id}/story`

  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: ''
  })


  const setNpc = (e) => {
    const selectedNpc = e.target.value;
    console.log(selectedNpc)
    setStory({...story, npc_id: selectedNpc})
  }


  // curl -X POST -H "Content-Type: application/json" \ -d '{ "npc_id": "6f83b2c1-7a35-431c-b6f7-b8998945c478", "map_id": "802a5f86-b0fc-4a9a-95cb-d9a66e494920", "text": "hello tst" }' \ localhost:3002/users/4896e484-a6d7-11ec-b909-0242ac120002/campaigns/b819024a-4fd2-4316-8697-411ad293bb71/story | json_pp


  const setMap = (e) => {
    const selectedMap = e.target.value;
    console.log(selectedMap)
    setStory({...story, map_id: selectedMap})
  }

  const setStoryText = (e) => {
    const newStoryText = e.target.value;
    setStory({...story, text: newStoryText})
  }
  // console.log("STORY", story)
  const createStory = (event) => {
    event.preventDefault()
      axios.post(`${address}`, story)
      .then((response) => {
        // console.log(response)
        setStory({
          npc_id: '',
          map_id: '',
          text: ''
        })
        console.log(story)
    })
    .catch((err) => console.log(err))
  }

  // const article = { title: 'React POST Request Example' };     
  // axios.post('https://reqres.in/invalid-url', article)         
  // .then(response => this.setState({ articleId: response.data.id }))         
  // .catch(error => {this.setState({ errorMessage: error.message });             console.error('There was an error!', error);         });

  return (
    <section className="card">
    <form autoComplete="off">
  <article className="card__container">
    <label className="card__title">
      Add Story Card
    </label>
    < textarea 
    className="card__text-area"
    value={story.text}
    onChange={setStoryText}
    />
  <article className="card__container">

    <DropDownListMap onChange={setMap}/>
    <DropDownListNpc onChange={setNpc}/>

  </article>

  <button className="button confirm" type="submit" onClick={createStory}>
    Submit
  </button>
  <button className="button cancel" >
    Reset
  </button>
  </article>
  {/* <div>{story.text}</div> */}
  </form>
</section>

  )
}

export default Form