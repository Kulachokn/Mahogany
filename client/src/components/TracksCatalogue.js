import React, { useState } from "react";
import TrackExtensionModal from "./TrackExtensionModal";
import {addTrackToPlaylist} from "../utils/addTrackToPlaylist";

const TracksCatalogue = ({ track: { track }, chooseTrack }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [chosenPlaylist, setChosenPlaylist] = useState("");

  const handlePlay = () => {
    chooseTrack(track);
  };

  const handleAct = () => {
    setOpenMenu(true);
  };

  const choosePlaylist = (playlistId) => {
    setChosenPlaylist(playlistId);
    console.log(playlistId);
    console.log(track);
    addTrackToPlaylist(playlistId, track.uri);
    setOpenMenu(false);
  };

  return (
    <>
      <li key={track.id}>
        <div onClick={handlePlay}>
          <img src={track.album.images[0].url} alt={track.name} width="50" />
          <h2>{track.name}</h2>
          <p>{track.artists[0].name}</p>
        </div>
        <button type="button" onClick={handleAct}>
          Add to
        </button>
      </li>
      {openMenu && <TrackExtensionModal choosePlaylist={choosePlaylist} />}
    </>
  );
};

export default TracksCatalogue;
