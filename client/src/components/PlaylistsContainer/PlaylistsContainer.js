import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from './PlaylistsContainer.module.css';

const PlaylistsContainer = ({userPlaylists}) => {
  return (
    <ul className={styles.list}>
      {userPlaylists.map((playlist) => (
        <PlaylistCard playlist={playlist} key={playlist.id} />
      ))}
    </ul>
  );
};

export default PlaylistsContainer;
