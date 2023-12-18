import { useState, useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { getUserPlaylists } from "../../utils/getUserPlaylists";

// import PlaylistsMenu from "../PlaylistsMenu/PlaylistsMenu";
import styles from "./TrackExtensionMenu.module.css";

const TrackExtensionMenu = ({ choosePlaylist }) => {
  //   const [openList, setOpenList] = useState(false);

  //   const handleOpenList = () => {
  //     setOpenList(true);
  //   };

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
          <p>List</p>
        </li>
        <li className={styles.item}>
          <p>Nav</p>
        </li>
        <li className={styles.item}>
          {/* <button onClick={handleOpenList}>Add to playlist</button> */}
          <DropdownButton
            // as={ButtonGroup}
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
                    // eventKey="1"
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

      {/* {openList && <PlaylistsMenu choosePlaylist={choosePlaylist} />} */}
    </div>
  );
};

export default TrackExtensionMenu;
