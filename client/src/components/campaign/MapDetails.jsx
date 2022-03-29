import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Map from "../../components/map";
import dataHelpers from "../../hooks/dataHelpers";
import useCampaignAssets from "../../hooks/useCampaignAssets";
import useMapData from "../../hooks/useMapData";
import update from "immutability-helper";

import "./MapDetails.css";
import CampContext from "../../providers/CampProvider";
import StoryCardItem from "./StoryCards/StoryCardItem";
import AuthContext from "../../providers/AuthProvider";
import NPCCardItem from "./NPCCardItem";

// Test URL
// http://localhost:3002/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/maps/927432f7-7839-4a6d-817f-8e1a925b2706
// Campaign: Middle Earth
// Map: Tavern
// User: rick.sandchez@gmail.com
// Pass: pass
const MapDetails = () => {
  const params = useParams();
  const [urlParams, setUrlParams] = useState({ ...params });
  const { campaign } = useContext(CampContext);
  const { auth } = useContext(AuthContext);
  const { state, setState } = useMapData(
    urlParams.m_id,
    urlParams.c_id,
    urlParams.u_id
  );
  const { campaignAssets } = useCampaignAssets();
  const [mapsForCampaign, setMapsForCampaign] = useState([]);
  const [tabStatus, setTabStatus] = useState({
    playerMaps: "player",
    assetsMapStoriesStorys: "map stories",
    assets_currNpcPlayerImages: "current",
  });
  const [hideMe, setHideMe] = useState(false);

  function addAssetToMap(asset_id, type) {
    // state.mapId
    axios
      .post(`/users/0/campaigns/0/maps/${state.mapId}/assets`, {
        asset_id,
        type,
      })
      .then((res) => {
        const newAsset = dataHelpers().convertArrayToObject([res.data], "id");
        const id = Object.keys(newAsset)[0];
        console.log(newAsset[id]);

        let stateType = "";

        switch (newAsset[id].type[0]) {
          case "N":
            stateType = "NPCs";
            break;
          case "I":
            stateType = "Images";
            break;
          case "S":
            stateType = "StoryCards";
            break;
          case "P":
            stateType = "PlayerAssets";
            break;
          default:
            stateType = "Images";
        }

        setState(
          update(state, {
            data: {
              [stateType]: {
                [id]: {
                  $set: newAsset[id],
                },
              },
            },
          })
        );
      });
  }

  async function deleteAssetFromMap(type, id) {
    setState((prev) => {
      const newState = { ...prev };
      delete newState.data[type][id];
      return newState;
    });
    await axios.delete(`/users/0/campaigns/0/assets/${id}`);
  }

  async function updateLayer(type, id, layer) {
    const newOrder = parseInt(layer);
    await axios.put(
      `/users/${
        urlParams.u_id
      }/campaigns/${campaign()}/maps/:m_id/assets/${id}/layer`,
      { layer_order: newOrder, asset_id: id }
    );
    setState(
      update(state, {
        data: {
          [type]: {
            [id]: {
              $merge: { layer_order: newOrder },
            },
          },
        },
      })
    );
  }
  function getLayer(type, id) {
    return state.data[type][id].layer_order;
  }

  async function updateNotes(text, updateDB) {
    if (updateDB)
      await axios.put(
        `/users/${urlParams.u_id}/campaigns/${campaign()}/notes`,
        { user_id: auth.user_id, content: text }
      );
    // console.log('put notes',result)
    setState(
      update(state, {
        data: {
          Notes: {
            $merge: { content: text },
          },
        },
      })
    );
  }
  function getNotes(test) {
    // console.log(state.data.Notes.content.split(/\r\n|\r|\n/).length)
    return state.data.Notes.content;
  }

  useEffect(() => {
    axios
      .get(`/users/${urlParams.u_id}/campaigns/${urlParams.c_id}/maps`)
      .then((result) => setMapsForCampaign(result.data));
  }, []);

  const [allNpcs, setAllNpcs] = useState([]);
  // console.log("NPCS state.npcs", state.npcs)
  useEffect(() => {
    axios
      .get(`/users/0/campaigns/${campaign()}/npcs`)
      .then((all) => setAllNpcs([...all.data]));
  }, []);
  // const storyCardsForMap = null;

  const [storyCardHackery, setStoryCardHackery] = useState({
    npcs: [],
    maps: [],
  });
  // console.log("NPCS state.npcs", state.npcs)
  useEffect(() => {
    Promise.all([
      axios.get(`/users/0/campaigns/${campaign()}/npcs`),
      axios.get(`/users/0/campaigns/${campaign()}/maps`),
    ]).then((all) => {
      setStoryCardHackery((prev) => {
        return { ...prev, npcs: all[0].data, maps: all[1].data };
      });
    });
  }, []);

  //////////////////////////
  // Story Card Functions
  //////////////////////////
  const onComplete = (event, id, card) => {
    event.preventDefault();
    console.log("fired");
    axios
      .put(`/users/0/campaigns/${campaign()}/story/${id}`, {
        map_id: card.maps_id,
        npc_id: card.npcs_id,
        text: card.story_card_text,
        completed: true,
      })
      .then(() => {
        setState((prev) => {
          const newState = { ...prev };
          for (const index in newState.data.Story) {
            if (newState.data.Story[index].id === id) {
              newState.data.Story[index].completed = true;
              break;
            }
          }
          return newState;
        });
      });
  };
  const onKill = (event, card, npc_id) => {
    event.preventDefault();
    const npc = storyCardHackery.npcs.find((npc) => npc.id === npc_id);
    console.log(npc, storyCardHackery, card);
    npc.alive = !npc.alive;
    //change what the name of the put request is//
    axios
      .put(`/users/0/campaigns/${campaign()}/npcs/${npc.id}/edit`, {
        ...npc,
        imageURL: npc.img,
      })
      .then(() => {
        setState((prev) => {
          const newState = { ...prev };

          if (newState.data?.NPCs[npc.id]?.name) {
            newState.data.NPCs[npc.id].alive = npc.alive;
          }
          return newState;
        });
        setStoryCardHackery((prev) => {
          const newState = { ...prev };

          const index = newState.npcs.findIndex((npc) => npc.id === npc_id);
          newState.npcs[index].alive = npc.alive;

          return newState;
        });
      })
      .catch((err) => console.log("Error From FORM's KILL Client Call", err));
  };

  const storyCardsForMap =
    state.data.StoryCards && allNpcs.length
      ? state.data.Story.map((card) => {
          if (card.maps_id !== state.mapId) return null;
          if (card.completed) return null;

          return (
            <StoryCardItem
              {...card}
              npcId={card.npcs_id}
              allMaps={storyCardHackery.maps}
              allNpcs={storyCardHackery.npcs}
              key={card.id + 1}
              text={card.story_card_text}
              order={card.order_num}
              view="SHOW"
              onComplete={(e) => onComplete(e, card.id, card)}
              onKill={(e) => onKill(e, card, card.npcs_id)}
            />
          );
        })
      : null;

  // const entireStory = null;
  const entireStory =
    state.data.Story && allNpcs.length
      ? state.data.Story.map((card) => {
          if (card.completed) return null;
          return (
            <StoryCardItem
              {...card}
              npcId={card.npcs_id}
              allMaps={storyCardHackery.maps}
              allNpcs={storyCardHackery.npcs}
              key={card.id + 1}
              text={card.story_card_text}
              order={card.order_num}
              view="SHOW"
              onComplete={(e) => onComplete(e, card.id, card)}
              onKill={(e) => onKill(e, card, card.npcs_id)}
            />
          );
        })
      : null;

  const currentPlayers =
    state.data.NPCs && Object.keys(state.data.PlayerAssets).length
      ? Object.keys(state.data.PlayerAssets).map((key) => {
          return (
            <div className="flex w-full">
              <div className="current-asset text-lg flex justify-between space-between place-items-center w-full">
                <div className="flex place-items-center">
                  <img
                    className="rounded-full border-primary border-2 w-20 h-20 mr-8 object-cover object-top"
                    src={state.data.PlayerAssets[key].img}
                    alt={state.data.PlayerAssets[key].name}
                  ></img>
                  <div className="text-left">
                    <h3>{state.data.PlayerAssets[key].name}</h3>
                    <h4>- player</h4>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <label>Layer</label>
                  <input
                    className="w-8 m-2 rounded-md text-2xl w-[50px]"
                    name="layer"
                    type="number"
                    min={1}
                    max={300}
                    value={getLayer("PlayerAssets", key)}
                    onChange={(e) =>
                      updateLayer("PlayerAssets", key, e.target.value)
                    }
                  />
                </div>
              </div>
              <div
                className="text-red-600 delete-button"
                onClick={() => deleteAssetFromMap("PlayerAssets", key)}
              >
                Delete
              </div>
            </div>
          );
        })
      : null;

  const currentNpcs =
    state.data.NPCs && Object.keys(state.data.NPCs).length
      ? Object.keys(state.data.NPCs).map((key) => {
          return (
            <div className="flex w-full">
              <div className="current-asset text-lg flex justify-between space-between place-items-center w-full">
                <div className="flex place-items-center">
                  <img
                    className="rounded-full border-primary border-2 w-20 h-20 mr-8 object-cover object-top"
                    src={state.data.NPCs[key].img}
                    alt={state.data.NPCs[key].name}
                  ></img>
                  <div className="text-left">
                    <h3>{state.data.NPCs[key].name}</h3>
                    <h4>- npc</h4>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <label>Layer</label>
                  <input
                    className="w-8 m-2 rounded-md text-2xl w-[50px]"
                    name="layer"
                    type="number"
                    min={1}
                    max={300}
                    value={getLayer("NPCs", key)}
                    onChange={(e) => updateLayer("NPCs", key, e.target.value)}
                  />
                </div>
              </div>
              <div
                className="text-red-600 delete-button"
                onClick={() => deleteAssetFromMap("NPCs", key)}
              >
                Delete
              </div>
            </div>
          );
        })
      : null;

  const currentImages =
    state.data.Images && Object.keys(state.data.Images).length
      ? Object.keys(state.data.Images).map((key) => {
          return (
            <div className="flex w-full">
              <div className="current-asset flex justify-between space-between place-items-center w-full">
                <div className="flex place-items-center">
                  <img
                    className="rounded-full border-primary border-2 w-20 h-20 mr-8 object-cover object-top"
                    src={state.data.Images[key].img}
                    alt={state.data.Images[key].name}
                  ></img>
                  <div className="text-left">
                    <h3>{state.data.Images[key].name}</h3>
                    <h4>- image</h4>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <label>Layer</label>
                  <input
                    className="w-8 m-2 rounded-md text-2xl w-[50px]"
                    name="layer"
                    min={1}
                    max={300}
                    type="number"
                    value={getLayer("Images", key)}
                    onChange={(e) => updateLayer("Images", key, e.target.value)}
                  />
                </div>
              </div>
              <div
                className="delete-button"
                onClick={() => deleteAssetFromMap("Images", key)}
              >
                Delete
              </div>
            </div>
          );
        })
      : null;
  return (
    <container className="mapContainer" id={urlParams.mapId}>
      <div className="map">
        {Object.keys(state.data).length && (
          <Map
            mapState={state}
            setMapState={setState}
            id={state.mapId}
            key={state.mapId}
          />
        )}
      </div>
      <div className="sidebar">
        <div className="grow relative ">
          <button
            className="absolute right-0 top-[-10px] mr-[8px]"
            onClick={() => setHideMe((prev) => !prev)}
          >
            {hideMe ? "Show" : "Hide"}
          </button>
          {!hideMe && (
            <div className="flex w-full max-h-fit">
              {/* Map Info */}
              <div className="card transition-all ease-in-out basis-1/2 hover:basis-5/6">
                <h1 className="md-title">{state.name}</h1>
                <h3 className="md-bio">{state.bio}</h3>
              </div>
              {/* Player/Map List */}
              <div className="card basis-1/2 overflow-y-auto max-h-[100%]">
                {/* Player/Map Tab Select */}
                <div className="tab-bar">
                  <h3
                    onClick={() => {
                      setTabStatus((prev) => {
                        return { ...prev, playerMaps: "player" };
                      });
                    }}
                  >
                    Players
                  </h3>
                  <h3
                    onClick={() => {
                      setTabStatus((prev) => {
                        return { ...prev, playerMaps: "maps" };
                      });
                    }}
                  >
                    Maps
                  </h3>
                </div>
                {tabStatus.playerMaps === "player" && (
                  <ul>
                    {!!state?.data?.Players?.length &&
                      state.data.Players.map((player) => {
                        return (
                          <li className="my-1 px-1">
                            <div className="flex w-full">
                              <div className="current-asset text-lg flex justify-between space-between place-items-center w-full">
                                <div className="flex place-items-center">
                                  <img
                                    className="rounded-full border-primary border-2 w-16 h-16 mr-8 object-cover object-top"
                                    src={player.profile_pic}
                                    alt={player.name}
                                  ></img>
                                  <div className="text-left">
                                    <h3>{player.name}</h3>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="flex items-center justify-center bg-bkgd h-auto rounded-lg my-auto py-2 px-1 cursor-pointer"
                                onClick={() =>
                                  window.open(player.sheet_url, "_blank")
                                }
                              >
                                Sheet
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                )}

                {/* Maps Card */}
                {tabStatus.playerMaps === "maps" && !!mapsForCampaign.length && (
                  <div className="flex flex-col">
                    {mapsForCampaign.map((map) => {
                      return (
                        <Link
                          to={`${map.id}`}
                          className="py-1 transition-all hover:bg-metal"
                          onClick={() =>
                            setState((prev) => {
                              return {
                                ...prev,
                                mapId: map.id,
                                background:
                                  map.id === prev.mapId
                                    ? prev.background
                                    : null,
                                data:
                                  map.id === prev.mapId
                                    ? { ...prev.data }
                                    : {
                                        ...prev.data,
                                        Images: {},
                                        NPCs: {},
                                        StoryCards: {},
                                      },
                              };
                            })
                          }
                        >
                          <div className="flex w-full">
                            <div className="current-asset text-lg flex justify-between space-between place-items-center w-full">
                              <div className="flex place-items-center">
                                <img
                                  className="rounded-lg border-primary border-2 w-16 h-16 mr-8 object-cover object-top"
                                  src={map.background}
                                  alt={map.name}
                                ></img>
                                <div className="text-left">
                                  <h3>{map.name}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Assets/Maps stories/Story tabs */}
        <div className="card">
          <div className="tab-bar">
            <h3
              onClick={() => {
                setTabStatus((prev) => {
                  return { ...prev, assetsMapStoriesStorys: "assets" };
                });
              }}
            >
              Assets
            </h3>
            <h3
              onClick={() => {
                setTabStatus((prev) => {
                  return { ...prev, assetsMapStoriesStorys: "map stories" };
                });
              }}
            >
              Map Stories
            </h3>
            <h3
              onClick={() => {
                setTabStatus((prev) => {
                  return { ...prev, assetsMapStoriesStorys: "story" };
                });
              }}
            >
              Story
            </h3>
          </div>

          <div className="card-body">
            {/* Tabs for Asset Page */}
            {tabStatus.assetsMapStoriesStorys === "assets" && (
              <div className="tab-bar">
                <h3
                  onClick={() => {
                    setTabStatus((prev) => {
                      return { ...prev, assets_currNpcPlayerImages: "current" };
                    });
                  }}
                >
                  Current
                </h3>
                <h3
                  onClick={() => {
                    setTabStatus((prev) => {
                      return { ...prev, assets_currNpcPlayerImages: "npcs" };
                    });
                  }}
                >
                  NPCs
                </h3>
                <h3
                  onClick={() => {
                    setTabStatus((prev) => {
                      return { ...prev, assets_currNpcPlayerImages: "players" };
                    });
                  }}
                >
                  Players
                </h3>
                <h3
                  onClick={() => {
                    setTabStatus((prev) => {
                      return { ...prev, assets_currNpcPlayerImages: "images" };
                    });
                  }}
                >
                  Images
                </h3>
              </div>
            )}

            {/* story cards for map */}
            {tabStatus.assetsMapStoriesStorys === "map stories" &&
              storyCardsForMap}

            {/* Entire Story */}
            {tabStatus.assetsMapStoriesStorys === "story" && entireStory}

            {/* Assets Card */}

            {tabStatus.assetsMapStoriesStorys === "assets" &&
              tabStatus.assets_currNpcPlayerImages === "current" &&
              currentPlayers}

            {tabStatus.assetsMapStoriesStorys === "assets" &&
              tabStatus.assets_currNpcPlayerImages === "current" &&
              currentNpcs}

            {tabStatus.assetsMapStoriesStorys === "assets" &&
              tabStatus.assets_currNpcPlayerImages === "current" &&
              currentImages}
            {tabStatus.assetsMapStoriesStorys === "assets" &&
              tabStatus.assets_currNpcPlayerImages !== "current" && (
                <>
                  <h1>Available Assets</h1>
                  <hr />
                </>
              )}
            {tabStatus.assetsMapStoriesStorys === "assets" &&
              tabStatus.assets_currNpcPlayerImages === "npcs" &&
              Object.keys(campaignAssets.NPCs).map((id) => {
                return (
                  <div className="asset-card">
                    <NPCCardItem
                      {...campaignAssets.NPCs[id]}
                      image={campaignAssets.NPCs[id].img}
                    >
                      <button onClick={() => addAssetToMap(id, "npc")}>
                        Add
                      </button>
                    </NPCCardItem>
                  </div>
                );
              })}
            {tabStatus.assetsMapStoriesStorys === "assets" &&
              tabStatus.assets_currNpcPlayerImages === "players" &&
              Object.keys(campaignAssets.Players).map((id) => {
                return (
                  <div className="asset-card">
                    <NPCCardItem
                      {...campaignAssets.Players[id]}
                      image={campaignAssets.Players[id].profile_pic}
                    >
                      <button onClick={() => addAssetToMap(id, "player")}>
                        Add
                      </button>
                    </NPCCardItem>
                  </div>
                );
              })}
            <div className="grid grid-cols-2">
              {tabStatus.assetsMapStoriesStorys === "assets" &&
                tabStatus.assets_currNpcPlayerImages === "images" &&
                Object.keys(campaignAssets.Images).map((id) => {
                  return (
                    <div
                      className="asset-card"
                      style={{
                        backgroundImage: `url("${campaignAssets.Images[id].src}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        objectFit: "contain",
                        height: "fit-content",
                      }}
                    >
                      <img
                        src={`${campaignAssets.Images[id].src}`}
                        style={{ visibility: "hidden" }}
                        className="max-h-[50%]"
                      />
                      <h3>IMG - {campaignAssets.Images[id].name}</h3>
                      <button onClick={() => addAssetToMap(id, "img")}>
                        Add
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </container>
  );
};

export default MapDetails;
