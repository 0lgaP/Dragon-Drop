import { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../providers/AuthProvider";
import CampContext from "../../providers/CampProvider";

const NotePad = () => {
  const [state, setState] = useState("");
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);

  useEffect(() => {
    axios
      .post(`/users/0/campaigns/${campaign()}/notes`, {
        user_id: auth.user_id,
      })
      .then((result) => setState(result.data.content));
  }, []);

  async function updateNotes(text, updateDB) {
    if (updateDB)
      await axios.put(`/users/0/campaigns/${campaign()}/notes`, {
        user_id: auth.user_id,
        content: text,
      });
    // console.log('put notes',result)
    setState(text);
  }
  function getNotes() {
    // console.log(state.data.Notes.content.split(/\r\n|\r|\n/).length)
    return state;
  }

  return (
    <div className="flex flex-col">
      <label>Notes : </label>
      <textarea
        type="textarea"
        name="notes"
        id="notesArea"
        value={state}
        onChange={(e) => {
          e.target.style.height = "";
          e.target.style.height = e.target.scrollHeight + "px";
          updateNotes(document.getElementById("notesArea").value, false);
        }}
        onFocus={(e) => {
          e.target.style.height = "";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
      <div
        className="md-button mx-auto self-center"
        onClick={(e) => {
          updateNotes(document.getElementById("notesArea").value, true);
        }}
      >
        Save
      </div>
    </div>
  );
};
export default NotePad;
