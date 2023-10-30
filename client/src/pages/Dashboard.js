import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Button from "react-bootstrap/Button";

import useAuth from "../useAuth";
import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";
import ModalWindow from "../components/Modal";
import PlaylistCard from "../components/PlaylistCard";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
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

  const storedAccessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (storedAccessToken) {
      spotifyApi.setAccessToken(storedAccessToken);
    }
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
  }, [search, accessToken, storedAccessToken]);

  const handleCloseModal = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    if (!Object.keys(formData).length > 0) return;

    // Create a private playlist
    // spotifyApi
    //   .createPlaylist(formData.name, {
    //     description: formData.description,
    //     public: true,
    //   })
    //   .then(
    //     function (data) {
    //       console.log("Created playlist!");
    //     },
    //     function (err) {
    //       console.log("Something went wrong!", err);
    //     }
    //   );

    const access_token = window.localStorage.getItem("accessToken");
    const user_id = window.localStorage.getItem("user_id");

    axios
      .post(
        `https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
          name: formData.name,
          description: formData.description,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Get the ID of the newly created playlist
        const playlist_id = response.data.id;
        console.log(playlist_id);
      });
  }, [formData.name, formData.description, formData]);

  useEffect(() => {
    const user_id = window.localStorage.getItem("user_id");
    // Get a user's playlists
    spotifyApi.getUserPlaylists(user_id).then((data) => {
      console.log(data.body.items);
      const playlistResults = data.body.items;
      setPlaylists(playlistResults);
    });
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
          : playlists.map((playlist) => <PlaylistCard playlist={playlist} key={playlist.id} />)}
      </div>
      <div>
        <Player
          accessToken={accessToken ? accessToken : storedAccessToken}
          trackUri={playingTrack?.uri}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
