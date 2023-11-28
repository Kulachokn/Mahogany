import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { ToastContainer, toast } from "react-toastify";
// import { spotifyApi } from 'react-spotify-web-playback';

import Player from "../components/Player";
import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import { convertTrackDuration } from "../utils/convertTrackDuration";
import { getSmallestAlbumImage } from "../utils/getSmallestAlbumImage";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const PlaylistPage = (playlist) => {
  // const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const params = useParams();
  const accessToken = localStorage.getItem("accessToken");

  const [playingTrack, setPlayingTrack] = useState("");

  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    spotifyApi.getPlaylist(params.playlistId).then((data) => {
      const convertedDuration = (duration) => convertTrackDuration(duration);

      const trackResult = data.body.tracks.items.map((item, ind) => {
        const smallestAlbumImage = getSmallestAlbumImage(item.track.album);
        const getArtists = item.track.artists
          .map((artist) => artist.name)
          .join(", ");

        return {
          index: ind,
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

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  // spotifyApi.getMyDevices()
  // .then(function(data) {
  //   let availableDevices = data.body.devices;
  //   console.log(availableDevices);
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  // });

//   if (playingTrack) {
//     spotifyApiMain.setAccessToken(accessToken);
//   spotifyApiMain.skipToPrevious()
//   .then(function() {
//     console.log('Skip to previous');
//   }, function(err) {
//     //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
//     console.log('Something went wrong!', err);
//   });

//   spotifyApiMain.skipToNext()
//   .then(function() {
//     console.log('Skip to next');
//   }, function(err) {
//     //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
//     console.log('Something went wrong!', err);
//   });
// }
  // spotifyApi.next(accessToken, '1298f51696514f4f7d1d66ef9bf96d05ce982731')
//====================================================================
  // console.log(track);
    // console.log(tracks);

    // tracks.forEach((item) => {
    //   if (item.uri === track.uri) {
    //     setTrackIndex(item.index);
    //     // console.log(item.index);
    //   }
    // });

  // const handlePreviousTrack = (track) => {
  //   if (trackIndex > 0) {
  //     const newInd = trackIndex - 1;

  //     setTrackIndex(newInd);

  //     return tracks[newInd];
  //   }

  //   setPlayingTrack(tracks[newInd]);
  //   spotifyApi.previous([tracks[newInd]])
  // };

  // const handleNextTrack = () => {
  //   if (trackIndex < tracks.length - 1) {
  //     setTrackIndex(trackIndex + 1);
  //   }
  // };

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
