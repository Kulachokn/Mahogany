import React, { useState, useEffect } from "react";
import { getUserPlaylists } from "../utils/getUserPlaylists";

const TrackExtensionModal = ({choosePlaylist}) => {
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
    <ul>
      {userPlaylists.length > 0 &&
        userPlaylists.map((playlist) => (
          <li
            id={playlist.id}
            key={playlist.id}
            onClick={() => handleChoosePlaylist(playlist.id)}
          >
            {playlist.name}
          </li>
        ))}
    </ul>
  );
};

export default TrackExtensionModal;
