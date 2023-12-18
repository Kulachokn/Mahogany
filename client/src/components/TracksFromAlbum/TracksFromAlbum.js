import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PlaylistsMenu from "../PlaylistsMenu/PlaylistsMenu";
import { addTrackToPlaylist } from "../../utils/addTrackToPlaylist";
import styles from "./TracksFromAlbum.module.css";

const TracksFromAlbum = ({
  track,
  ind,
  chooseTrack,
  removeFromFavorites,
  addToFavorites,
  page,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handlePlay = () => {
    chooseTrack(track);
  };

  const handleRemove = () => {
    let title = track.title;
    track = track.uri.split(":")[2];
    removeFromFavorites(track, title);
  };

  const handleAdd = () => {
    let title = track.title;
    track = track.uri.split(":")[2];
    addToFavorites(track, title);
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
        onClick={handlePlay}
      >
        <span className={styles.number}>{ind + 1}</span>
        <div className={styles.title}>
          <h3 className={styles.name}>
            {track.title ? track.title : track.name}
          </h3>
          <p className={styles.artist}>{track.artist}</p>
        </div>
        <p className={styles.duration}>{track.duration}</p>
        {page === "library" ? (
          <button type="button" onClick={handleRemove} className={styles.btn}>
            <svg
              className={styles.removeIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <button type="button" onClick={handleAdd} className={styles.btn}>
            <svg
              className={styles.addIcon}
              fill="#109BA8"
              viewBox="0 0 24 24"
              id="add-playlist"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                id="secondary"
                cx="6.5"
                cy="17.5"
                r="3.5"
                fill="#109BA8"
                strokeWidth="2"
              ></circle>
              <path
                id="primary"
                d="M14,15h7M17,5h4M19,3V7M14,19h7"
                fill="none"
                stroke="#109BA8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle
                id="primary-2"
                data-name="primary"
                cx="6.5"
                cy="17.5"
                r="3.5"
                fill="none"
                stroke="#109BA8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
              <path
                id="primary-3"
                data-name="primary"
                d="M14,10a2.86,2.86,0,0,0-1-4,23.19,23.19,0,0,1-3-3V17.5"
                fill="none"
                stroke="#109BA8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
        )}
        <button type="button" onClick={handleOpenMenu} className={styles.btn}>
          <svg
            className={styles.addIcon}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M810.666667 149.333333H213.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667v128c0 23.466667 19.2 42.666667 42.666666 42.666667h597.333334c23.466667 0 42.666667-19.2 42.666666-42.666667V192c0-23.466667-19.2-42.666667-42.666666-42.666667zM810.666667 405.333333H213.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667v128c0 23.466667 19.2 42.666667 42.666666 42.666667h597.333334c23.466667 0 42.666667-19.2 42.666666-42.666667v-128c0-23.466667-19.2-42.666667-42.666666-42.666667zM810.666667 661.333333H213.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667v128c0 23.466667 19.2 42.666667 42.666666 42.666667h597.333334c23.466667 0 42.666667-19.2 42.666666-42.666667v-128c0-23.466667-19.2-42.666667-42.666666-42.666667z"
              fill="#D1C4E9"
            />
            <path
              d="M810.666667 810.666667m-213.333334 0a213.333333 213.333333 0 1 0 426.666667 0 213.333333 213.333333 0 1 0-426.666667 0Z"
              fill="#109BA8"
            />
            <path
              d="M768 682.666667h85.333333v256h-85.333333z"
              fill="#FFFFFF"
            />
            <path
              d="M682.666667 768h256v85.333333H682.666667z"
              fill="#FFFFFF"
            />
          </svg>
        </button>
        {openMenu && <PlaylistsMenu choosePlaylist={choosePlaylist} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default TracksFromAlbum;
