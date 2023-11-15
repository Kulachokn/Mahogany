import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrackExtensionModal from "../TrackExtensionModal";
import { addTrackToPlaylist } from "../../utils/addTrackToPlaylist";
import styles from "./TrackSearchResult.module.css";

const TrackSearchResult = ({ track, ind, chooseTrack }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handlePlay = () => {
    chooseTrack(track);
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const choosePlaylist = (playlistId) => {
    addTrackToPlaylist(playlistId, track.uri);
    toast(`Added to ${playlistId}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setOpenMenu(false);
  };

  return (
    <>
      <div
        className={styles.item}
        style={{ cursor: "pointer" }}
        onClick={handlePlay}
      >
        <span className={styles.number}>{ind + 1}</span>
        <img
          src={track.albumUrl}
          alt={track.title}
          className={styles.image}
        />
        <div className={styles.title}>
        <h3 className={styles.name}>{track.title}</h3>
        <p className={styles.artist}>{track.artist}</p>
        </div>
        <p className={styles.album}>{track.album}</p>
        <p className={styles.duration}>{track.duration}</p>
      <button type="button" onClick={handleOpenMenu}>
        Add to
      </button>
      </div>
      {openMenu && <TrackExtensionModal choosePlaylist={choosePlaylist} />}
      <ToastContainer />
    </>
  );
};

export default TrackSearchResult;
