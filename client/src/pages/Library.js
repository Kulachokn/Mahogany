import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

const Library = ({ code }) => {
  const accessToken = localStorage.getItem("accessToken");

  spotifyApi.setAccessToken(accessToken);
  const [savedTracks, setSavedTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMySavedTracks({
        limit: 10,
        offset: 1,
      })
      .then(
        (res) =>
          setSavedTracks(
            res.body.items.map((item) => {
              const smallestAlbumImage = item.track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image;
                  return smallest;
                },
                item.track.album.images[0]
              );

              return {
                artist: item.track.artists[0].name,
                title: item.track.name,
                uri: item.track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            })
          )
        // function (err) {
        //   console.log("Something went wrong!", err);
        // }
      );
  }, [accessToken]);

  return (
    <>
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <h1>My Library</h1>
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {savedTracks.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </Container>
    </>
  );
};

export default Library;
