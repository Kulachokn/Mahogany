import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { MutatingDots } from "react-loader-spinner";

import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import Player from "../components/Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

const Library = () => {
  const [savedTracks, setSavedTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setLoading(false);
          return;
        }

        spotifyApi.setAccessToken(accessToken);

        const response = await spotifyApi.getMySavedTracks({
          limit: 10,
          offset: 1,
        });

        const convertDuration = (duration) => {
          const minutes = Math.floor(duration / (1000 * 60));
          const seconds = Math.floor((duration % (1000 * 60)) / 1000);
          return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        };

        const tracks = response.body.items.map((item) => {
          // console.log(item);
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
            album: item.track.album.name,
            duration: convertDuration(item.track.duration_ms),
          };
        });

        setSavedTracks(tracks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <>
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <h1>My Library</h1>
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {loading ? (
            <MutatingDots
              height="100"
              width="100"
              color="#109BA8"
              secondaryColor="#109BA8"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            savedTracks.map((track, ind) => (
              <TrackSearchResult
                ind={ind}
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))
          )}
        </div>
        <Player
          accessToken={spotifyApi.getAccessToken()}
          trackUri={playingTrack?.uri}
        />
      </Container>
    </>
  );
};

export default Library;

// spotifyApi.removeFromMySavedTracks(["3VNWq8rTnQG6fM1eldSpZ0"])
// .then(function(data) {
//   console.log('Removed!');
// }, function(err) {
//   console.log('Something went wrong!', err);
// });
