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
import PlaylistCard from "../components/PlaylistCard";
import { getUserPlaylists } from "../utils/getUserPlaylists";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const savedPlaylists = JSON.parse(localStorage.getItem("playlists"));

  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [show, setShow] = useState(false);
  const [playlists, setPlaylists] = useState(savedPlaylists);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken || typeof accessToken !== "string") return;
    spotifyApi.setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);

    const getUserId = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const res = await response.json();

      if (res.error) return;

      window.localStorage.setItem("user_id", res.id);
    };
    console.log("accessRequest");
    getUserId();
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || typeof accessToken !== "string") return;
    console.log("getRequest");
    getUserPlaylists()
      .then((playlistResults) => {
        localStorage.setItem("playlists", JSON.stringify(playlistResults));
        setPlaylists(playlistResults);
      })
      .catch((err) => console.log(err.message));
  }, [accessToken]);

  const storedAccessToken = localStorage.getItem("accessToken");
  // spotifyApi.setAccessToken(storedAccessToken);
  useEffect(() => {
    if (!search) return setSearchResults([]);
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      spotifyApi.setAccessToken(storedAccessToken);
      console.log("searchRequest");
      spotifyApi.searchTracks(search).then((res) => {
        if (res) return toast.error("There are no results for your query");
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
    } catch (error) {
      console.error("There are no results for your query", error);
      toast.error("There are no results for your query");
    }
  }, [search]);

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
        const playlist_id = response.body.id;

        console.log(playlist_id);
        getUserPlaylists()
          .then((playlistResults) => {
            localStorage.setItem("playlists", JSON.stringify(playlistResults));
            setPlaylists(playlistResults);
          })
          .catch((err) => {
            console.log(err.message);
            toast.error("New Playlist wasn't added");
          });
      });
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
        {searchResults.length > 1
          ? searchResults.map((track, ind) => (
              <TrackSearchResult
                ind={ind}
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
                page="dashboard"
              />
            ))
          : playlists &&
            playlists.map((playlist) => (
              <PlaylistCard playlist={playlist} key={playlist.id} />
            ))}
      </div>
      <Player
        accessToken={accessToken ? accessToken : storedAccessToken}
        trackUri={playingTrack?.uri}
      />
    </Container>
  );
};

export default Dashboard;
