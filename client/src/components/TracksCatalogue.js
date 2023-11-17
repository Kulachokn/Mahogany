import React, { useState } from "react";
import TrackExtensionMenu from "./TrackExtensionMenu/TrackExtensionMenu";
import {addTrackToPlaylist} from "../utils/addTrackToPlaylist";

const TracksCatalogue = ({ track: { track }, chooseTrack }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handlePlay = () => {
    chooseTrack(track);
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const choosePlaylist = (playlistId) => {
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
        <button type="button" onClick={handleOpenMenu}>
          Add to
        </button>
      </li>
      {openMenu && <TrackExtensionMenu choosePlaylist={choosePlaylist} />}
    </>
  );
};

export default TracksCatalogue;
