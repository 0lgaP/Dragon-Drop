import { createContext, useState, useEffect } from "react";

const CampContext = createContext({});

export const CampProvider = (props) => {
  const [stateCampaign, setStateCampaign] = useState("");

  useEffect(() => {
    // console.log("campProv", localVal);
    // console.log(!!!campaign && !!localVal);
  }, []);

  function getCampaign() {
    const localVal = window.localStorage.getItem("campaign_id");
    if (!!!stateCampaign && !!localVal) {
      setStateCampaign(localVal);
      return localVal;
    }
    return stateCampaign;
  }

  function setCampaign(campaign_id) {
    window.localStorage.setItem("campaign_id", campaign_id);
    setStateCampaign(campaign_id);
  }

  return (
    <CampContext.Provider
      value={{
        campaign: getCampaign,
        setCampaign,
        campaign_id: stateCampaign,
      }}
    >
      {props.children}
    </CampContext.Provider>
  );
};

export default CampContext;
