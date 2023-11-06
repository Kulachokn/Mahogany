import React, { useState } from "react";
import TrackExtensionModal from "./TrackExtensionModal";
import { addTrackToPlaylist } from "../utils/addTrackToPlaylist";

const TrackSearchResult = ({ track, chooseTrack }) => {
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
      <div
        className="d-flex m-2 align-items-center"
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
      >
        <img
          src={track.albumUrl}
          alt={track.title}
          style={{ height: "64px", width: "64px" }}
        />
        <div className="ml-3">
          <div>{track.title}</div>
          <div className="text-muted">{track.artist}</div>
        </div>
      </div>
      <button type="button" onClick={handleOpenMenu}>
        Add to
      </button>
      {openMenu && <TrackExtensionModal choosePlaylist={choosePlaylist} />}
    </>
  );
};

export default TrackSearchResult;
