import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { ToastContainer, toast } from "react-toastify";

import Player from "../components/Player";
import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const PlaylistPage = () => {
  const [tracks, setTracks] = useState([]);
  const params = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const [playingTrack, setPlayingTrack] = useState("");

  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.getPlaylist(params.playlistId).then((data) => {
      const trackResult = data.body.tracks.items.map((elem) => elem.track);
      setTracks(trackResult);
    });
  }, [params.playlistId]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  const addToFavorites = async (track, title) => {
    try {
      await spotifyApi.addToMySavedTracks([track]);
      toast(`Track ${title} added`, {
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
      console.error("Error adding track:", error);
      toast.error(`Error adding track: ${error.message}`);
    }
  };

  return (
    <div>
      <Link to=".." className="leftArrowLink">
        <svg
          width="25"
          height="25"
          className="leftArrow"
          viewBox="0 0 24 24"
          id="left-arrow icon flat-color"
          data-name="Flat Color"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="primary"
            d="M21,11H5.41l1.3-1.29A1,1,0,0,0,5.29,8.29l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H21a1,1,0,0,0,0-2Z"
          ></path>
        </svg>
      </Link>
      <div className="listWrap">
        <ToastContainer />
        <ul className="trackList">
          {tracks.map((track, ind) => (
            <TrackSearchResult
              ind={ind}
              track={track}
              key={track.id}
              chooseTrack={chooseTrack}
              addToFavorites={addToFavorites}
            />
          ))}
        </ul>
      </div>
      <div className="player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default PlaylistPage;
