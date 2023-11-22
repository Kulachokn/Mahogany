import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import useAuth from "../useAuth";
import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import Player from "../components/Player";
import CreatePlaylistModal from "../components/CreatePlaylistModal/CreatePlaylistModal";
import { getSmallestAlbumImage } from "../utils/getSmallestAlbumImage";
import { convertTrackDuration } from "../utils/convertTrackDuration";
import { getUserProfile } from "../utils/getUserProfile";

import PlaylistsGallery from "../components/PlaylistsGallery";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [show, setShow] = useState(false);
  const [updateSavedPlaylists, setUpdateSavedPlaylists] = useState(false)

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
        setUpdateSavedPlaylists(true)
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

  return (
    <Container className="d-flex flex-column" style={{ height: "100vh" }}>
      <ToastContainer />
      <Button variant="primary" onClick={handleShow}>
        &#43;
      </Button>
      <CreatePlaylistModal
        onHide={handleCloseModal}
        show={show}
        onFormSubmit={handleFormSubmit}
      />
      <Form.Control
        type="search"
        placeholder="Search Song"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
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
          <PlaylistsGallery updateSavedPlaylists={updateSavedPlaylists}/>
        )}
      </div>
      <Player
        accessToken={accessToken ? accessToken : storedAccessToken}
        trackUri={playingTrack?.uri}
      />
    </Container>
  );
};

export default Dashboard;
