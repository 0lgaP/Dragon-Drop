import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CampContext from "../providers/CampProvider";
import dataHelpers from "./dataHelpers";

function useCampaignAssets(campaignId, userId = 0) {
  const { campaign, setCampaign, rawDawgCampaign } = useContext(CampContext);
  const [campaignAssets, setCampaignAssets] = useState({
    campaignId: campaignId ? campaignId : campaign(),
    NPCs: {},
    Images: {},
  });

  useEffect(() => {
    // CHANGE TO OUR DATABASE QUERIES:
    axios
      .get(
        `/users/${userId}/campaigns/${
          campaignId ? campaignId : campaign()
        }/assets`
      )
      .then((res) => {
        console.log("ca", res);
        setCampaignAssets((prev) => ({
          ...prev,
          Images: dataHelpers().convertArrayToObject(res.data.Images, "id"),
          NPCs: dataHelpers().convertArrayToObject(res.data.NPCs, "id"),
        }));
      });
  }, [campaignAssets.campaignId, rawDawgCampaign]);

  return { campaignAssets, setCampaignAssets };
}

export default useCampaignAssets;
