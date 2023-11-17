import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { MutatingDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import Player from "../components/Player";
import { getSmallestAlbumImage } from "../utils/getSmallestAlbumImage";
import { convertTrackDuration } from "../utils/convertTrackDuration";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
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

        const convertedDuration = (duration) => convertTrackDuration(duration);

        const tracks = response.body.items.map((item) => {
          const smallestAlbumImage = getSmallestAlbumImage(item.track.album);

          return {
            artist: item.track.artists[0].name,
            title: item.track.name,
            uri: item.track.uri,
            albumUrl: smallestAlbumImage.url,
            album: item.track.album.name,
            duration: convertedDuration(item.track.duration_ms),
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

  const removeFromFavorites = async (track, title) => {
    try {
      await spotifyApi.removeFromMySavedTracks([track]);
      toast(`Track ${title} removed`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error removing track:", error);
      toast.error(`Error removing track: ${error.message}`);
    }
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
                removeFromFavorites={removeFromFavorites}
                page="library"
              />
            ))
          )}
          <ToastContainer />
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
