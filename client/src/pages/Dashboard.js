import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Button from "react-bootstrap/Button";

import useAuth from "../useAuth";
import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";
import ModalWindow from "../components/CreatePlaylistModal";
import PlaylistCard from "../components/PlaylistCard";

import { getUserPlaylists } from "../utils/getUserPlaylists";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [show, setShow] = useState(false);
  // const [formData, setFormData] = useState({});
  const [playlists, setPlaylists] = useState([]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
  };

  useEffect(() => {
    if (!accessToken) return;
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

    getUserId();
  }, [accessToken]);

  // const storedAccessToken = localStorage.getItem("accessToken");
  // spotifyApi.setAccessToken(storedAccessToken);
  useEffect(() => {
    if (!search) return setSearchResults([]);

    spotifyApi.searchTracks(search).then((res) => {
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
  }, [search]);

  const handleCloseModal = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (data) => {
    // setFormData(data); /// check
    spotifyApi
      .createPlaylist(data.name, {
        description: data.description,
        public: true,
      })
      .then((response) => {
        console.log("Created playlist!");
        const playlist_id = response.body.id;
        console.log(playlist_id);
      });
  };

  useEffect(() => {
    getUserPlaylists()
      .then((playlistResults) => setPlaylists(playlistResults))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Song"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button variant="primary" onClick={handleShow}>
        &#43;
      </Button>
      <ModalWindow
        onHide={handleCloseModal}
        show={show}
        onFormSubmit={handleFormSubmit}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.length > 1
          ? searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))
          : playlists.map((playlist) => (
              <PlaylistCard playlist={playlist} key={playlist.id} />
            ))}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
};

export default Dashboard;
