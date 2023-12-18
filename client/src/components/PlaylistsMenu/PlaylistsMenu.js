import React, { useState, useEffect } from "react";

import { getUserPlaylists } from "../../utils/getUserPlaylists";
import styles from "./PlaylistsMenu.module.css";

const PlaylistsMenu = ({ choosePlaylist }) => {
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
    <ul className={styles.playlistMenu}>
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
  );
};

export default PlaylistsMenu;
