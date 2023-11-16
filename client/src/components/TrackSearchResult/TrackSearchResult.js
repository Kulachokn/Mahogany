import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrackExtensionModal from "../TrackExtensionModal";
import { addTrackToPlaylist } from "../../utils/addTrackToPlaylist";
import styles from "./TrackSearchResult.module.css";

const TrackSearchResult = ({
  track,
  ind,
  chooseTrack,
  removeFromFavorites,
  page,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handlePlay = () => {
    chooseTrack(track);
  };

  const handleRemove = () => {
    let title = track.title
    track = track.uri.split(":")[2];
    removeFromFavorites(track, title);
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
        <img src={track.albumUrl} alt={track.title} className={styles.image} />
        <div className={styles.title}>
          <h3 className={styles.name}>{track.title}</h3>
          <p className={styles.artist}>{track.artist}</p>
        </div>
        <p className={styles.album}>{track.album}</p>
        <p className={styles.duration}>{track.duration}</p>
        {page === "library" ? (
          <button
            type="button"
            onClick={handleRemove}
            className={styles.removeBtn}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.removeIcon}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <button type="button">Add to favorites</button>
        )}
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
