import PlaylistCard from "./PlaylistCard";

const PlaylistsContainer = ({userPlaylists}) => {
  return (
    <ul>
      {userPlaylists.map((playlist) => (
        <PlaylistCard playlist={playlist} key={playlist.id} />
      ))}
    </ul>
  );
};

export default PlaylistsContainer;
