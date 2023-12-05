import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import useAuth from "../useAuth";
import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import Player from "../components/Player";
import CreatePlaylistModal from "../components/CreatePlaylistModal/CreatePlaylistModal";
import { getSmallestAlbumImage } from "../utils/getSmallestAlbumImage";
import { convertTrackDuration } from "../utils/convertTrackDuration";
import { getUserProfile } from "../utils/getUserProfile";
import styles from "./Dashboard.module.css";

import PlaylistsGallery from "../components/PlaylistsGallery/PlaylistsGallery";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [show, setShow] = useState(false);
  const [updateSavedPlaylists, setUpdateSavedPlaylists] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (!accessToken || typeof accessToken !== "string") return;
    spotifyApi.setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);

    getUserProfile();

    console.log("accessRequest");
  }, [accessToken]);

  const storedAccessToken = localStorage.getItem("accessToken");
  // spotifyApi.setAccessToken(storedAccessToken);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    try {
      // const storedAccessToken = localStorage.getItem("accessToken");
      spotifyApi.setAccessToken(storedAccessToken);
      console.log("searchRequest");
      spotifyApi.searchTracks(search).then((response) => {
        const convertedDuration = (duration) => convertTrackDuration(duration);
        const tracks = response.body.tracks.items.map((item) => {
          const smallestAlbumImage = getSmallestAlbumImage(item.album);
          const getArtists = item.artists
            .map((artist) => artist.name)
            .join(", ");

          return {
            artist: getArtists,
            title: item.name,
            uri: item.uri,
            albumUrl: smallestAlbumImage.url,
            album: item.album.name,
            duration: convertedDuration(item.duration_ms),
          };
        });

        setSearchResults(tracks);
      });
    } catch (error) {
      console.error("There are no results for your query", error);
      toast.error("There are no results for your query");
    }
  }, [search, storedAccessToken]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  const handleCloseModal = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (data) => {
    console.log("formRequest");
    spotifyApi
      .createPlaylist(data.name, {
        description: data.description,
        public: true,
      })
      .then((response) => {
        toast(`Playlist ${data.name} created!`, {
          position: "bottom-right",
          hideProgressBar: true,
        });
        setUpdateSavedPlaylists(true);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("New Playlist wasn't added");
      });
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

  const handleButtonClick = () => {
    setFormVisible(!formVisible);
  };

  const handleInputBlur = () => {
    if (search.trim() === "") {
      setFormVisible(false);
    }
  };

  return (
    <>
      <div className={styles.controllersWrap}>
        <button
          type="button"
          onClick={handleShow}
          className={styles.addPlaylist}
          title="Create a Playlist"
        >
          <svg
            className={styles.addPlaylistIcon}
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.5 29.5c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM21.938 15.938c0-0.552-0.448-1-1-1h-4v-4c0-0.552-0.447-1-1-1h-1c-0.553 0-1 0.448-1 1v4h-4c-0.553 0-1 0.448-1 1v1c0 0.553 0.447 1 1 1h4v4c0 0.553 0.447 1 1 1h1c0.553 0 1-0.447 1-1v-4h4c0.552 0 1-0.447 1-1v-1z"></path>
          </svg>
        </button>
        <div className={styles.searchWrap}>
          <button
            type="button"
            className={styles.searchBtn}
            onClick={handleButtonClick}
            title="Search"
          >
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {formVisible && (
          <Form.Control
            type="search"
            placeholder="Search Song"
            className={styles.form}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={handleInputBlur}
          />
        )}
      </div>
      <div className={styles.contentWrap}>
        {searchResults.length > 1 ? (
          searchResults.map((track, ind) => (
            <TrackSearchResult
              ind={ind}
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
              addToFavorites={addToFavorites}
              page="dashboard"
            />
          ))
        ) : (
          <PlaylistsGallery updateSavedPlaylists={updateSavedPlaylists} />
        )}
      </div>
      <div className="player">
        <Player
          accessToken={accessToken ? accessToken : storedAccessToken}
          trackUri={playingTrack?.uri}
        />
      </div>
      <ToastContainer />
      <CreatePlaylistModal
        onHide={handleCloseModal}
        show={show}
        onFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default Dashboard;
