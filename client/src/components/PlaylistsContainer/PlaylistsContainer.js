import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from './PlaylistsContainer.module.css';

const PlaylistsContainer = ({playlists}) => {
  return (
    <ul className={styles.list}>
      {playlists.map((playlist) => (
        <PlaylistCard playlist={playlist} key={playlist.id} />
      ))}
    </ul>
  );
};

export default PlaylistsContainer;
