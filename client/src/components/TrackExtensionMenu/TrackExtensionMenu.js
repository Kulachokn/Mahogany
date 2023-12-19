import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { getUserPlaylists } from "../../utils/getUserPlaylists";
import styles from "./TrackExtensionMenu.module.css";

const TrackExtensionMenu = ({ choosePlaylist, track }) => {
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
    <div className={`${styles.menuList} ${styles.menu}`}>
      <ul className={styles.menuWrap}>
        <li className={styles.item}>
          {track.artists.map((artist, ind) => <Link to={`/artists/${artist.id}`} key={ind+'qw'}>Go to {artist.name}</Link>)}
        </li>
        <li className={styles.item}>
          <p>Nav</p>
        </li>
        <li className={styles.item}>
          {/* <button onClick={handleOpenList}>Add to playlist</button> */}
          <DropdownButton
            key="start"
            id={`dropdown-button-drop-start`}
            drop="start"
            variant="secondary"
            title="Drop start"
          >
            <ul className={styles.playlistMenu}>
              {userPlaylists.length > 0 &&
                userPlaylists.map((playlist) => (
                  <Dropdown.Item
                    id={playlist.id}
                    key={playlist.id}
                    onClick={() => handleChoosePlaylist(playlist.id)}
                    className={styles.item}
                  >
                    {playlist.name}
                  </Dropdown.Item>
                ))}
            </ul>
          </DropdownButton>
        </li>
      </ul>
    </div>
  );
};

export default TrackExtensionMenu;
