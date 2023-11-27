import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import Player from "../components/Player";
import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import { convertTrackDuration } from "../utils/convertTrackDuration";
import { getSmallestAlbumImage } from "../utils/getSmallestAlbumImage";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
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
      const convertedDuration = (duration) => convertTrackDuration(duration);

      const trackResult = data.body.tracks.items.map((item) => {
        const smallestAlbumImage = getSmallestAlbumImage(item.track.album);
        const getArtists = item.track.artists
          .map((artist) => artist.name)
          .join(", ");

        return {
          artist: getArtists,
          title: item.track.name,
          uri: item.track.uri,
          albumUrl: smallestAlbumImage.url,
          album: item.track.album.name,
          duration: convertedDuration(item.track.duration_ms),
        };
      });
      setTracks(trackResult);
    });
  }, [params.playlistId]);

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
      <Link to="..">Back</Link>
      <div>
        <ToastContainer />
        <ul className="" style={{ overflowY: "auto" }}>
          {tracks.map((track, ind) => (
            <TrackSearchResult
              ind={ind}
              track={track}
              key={track.uri}
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
