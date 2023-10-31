import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { Container } from "react-bootstrap";

import Player from "../components/Player";

import TracksCatalogue from "../components/TracksCatalogue";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

const PlaylistPage = (playlist) => {
  const [tracks, setTracks] = useState([]);
  const params = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const [playingTrack, setPlayingTrack] = useState();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.getPlaylist(params.playlistId).then((data) => {
      setTracks(data.body.tracks.items);
    });
  }, [params.playlistId]);

  return (
    <div>
      <Link to="..">Back</Link>
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <ul className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {tracks.map((track) => (
            <TracksCatalogue
              key={track.track.id}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </ul>
      </Container>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </div>
  );
};

export default PlaylistPage;
