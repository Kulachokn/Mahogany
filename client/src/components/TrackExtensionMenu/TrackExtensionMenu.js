import React, { useState, useEffect } from "react";

import { getUserPlaylists } from "../../utils/getUserPlaylists";
import styles from './TrackExtensionMenu.module.css';

const TrackExtensionMenu = ({ choosePlaylist }) => {
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    getUserPlaylists()
      .then((result) => setUserPlaylists(result))
      .catch((err) => console.log(err.message));
  }, []);

  const handleChoosePlaylist = (playlistId) => {
    choosePlaylist(playlistId);
  };

  return (
    <div className={styles.menuWrap}>
      <ul>
        {userPlaylists.length > 0 &&
          userPlaylists.map((playlist) => (
            <li
              id={playlist.id}
              key={playlist.id}
              onClick={() => handleChoosePlaylist(playlist.id)}
              className={styles.item}
            >
              {playlist.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TrackExtensionMenu;
