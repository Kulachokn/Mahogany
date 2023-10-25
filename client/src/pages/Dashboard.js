import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

import useAuth from "../useAuth";
import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  const storedAccessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (storedAccessToken) {
      spotifyApi.setAccessToken(storedAccessToken);
    }
    if (!search) return setSearchResults([]);
    // if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

  }, [search, accessToken, storedAccessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Song"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <div>
        <Player accessToken={accessToken ? accessToken : storedAccessToken} trackUri={playingTrack?.uri} />
        {/* <Player accessToken={accessToken ? accessToken : storedAccessToken}  /> */}
      </div>
    </Container>
  );
};

export default Dashboard;
