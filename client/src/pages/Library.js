import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { MutatingDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import Player from "../components/Player";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Library = () => {
  const [savedTracks, setSavedTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken || typeof accessToken !== "string") {
          setLoading(false);
          return;
        }

        spotifyApi.setAccessToken(accessToken);

        const response = await spotifyApi.getMySavedTracks({
          limit: 10,
          offset: 1,
        });

        const tracks = response.body.items.map((item) => {
          return item.track;
        });

        setSavedTracks(tracks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(`Error fetching data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [updateFlag]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  const removeFromFavorites = async (track, title) => {
    try {
      await spotifyApi.removeFromMySavedTracks([track]);
      removeFromLibrary(track);
      toast(`Track ${title} removed from Library`, {
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

  const removeFromLibrary = (track) => {
    const updatedTracks = savedTracks.filter((prevTrack) => prevTrack.uri !== track.uri);
    setSavedTracks(updatedTracks);
    setUpdateFlag((prev) => !prev);
  } 

  return (
    <div>
      <h1 className="title">My Library</h1>
      <div>
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
      <div className="player">
        <Player
          accessToken={spotifyApi.getAccessToken()}
          trackUri={playingTrack?.uri}
        />
      </div>
    </div>
  );
};

export default Library;
