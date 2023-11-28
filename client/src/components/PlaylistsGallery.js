import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

import { getUserPlaylists } from "../utils/getUserPlaylists";
import { convertDate } from "../utils/convertDate";
// import PlaylistsContainer from "./PlaylistsContainer/PlaylistsContainer";
import PlaylistCarousel from "./Carousel/Carousel";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const PlaylistsGallery = ({ updateSavedPlaylists }) => {
  const savedPlaylists = JSON.parse(localStorage.getItem("playlists"));

  const [userPlaylists, setUserPlaylists] = useState(savedPlaylists);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  const storedAccessToken = localStorage.getItem("accessToken");
  spotifyApi.setAccessToken(storedAccessToken);

  useEffect(() => {
    if (!storedAccessToken || typeof storedAccessToken !== "string") return;
    console.log("getRequest");
    getUserPlaylists()
      .then((playlistResults) => {
        localStorage.setItem("playlists", JSON.stringify(playlistResults));
        setUserPlaylists(playlistResults);
      })
      .catch((err) => console.log(err.message));
  }, [storedAccessToken, updateSavedPlaylists]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        spotifyApi.setAccessToken(storedAccessToken);
        const user = JSON.parse(localStorage.getItem("user"));
        const country = user.country;

        const timestamp = convertDate(Date.now());

        const myPlaylists = await spotifyApi.getFeaturedPlaylists({
          limit: 10,
          offset: 1,
          country: country,
          timestamp: timestamp,
        });
        setFeaturedPlaylists(myPlaylists.body.playlists.items);

        const newReleases = await spotifyApi.getNewReleases({
          limit: 10,
          offset: 1,
          country: country,
        });
        setNewReleases(newReleases.body.albums.items);
      } catch (error) {
        console.error("Something went wrong:", error.message);
      }
    };

    fetchData();
  }, [storedAccessToken]);

  return (
    <div>
      <h2>My Playlists</h2>
      {userPlaylists && <PlaylistCarousel playlists={userPlaylists} />}
      <h2>Featured Playlists</h2>
      <PlaylistCarousel playlists={featuredPlaylists} />
      <h2>New Releases</h2>
      <PlaylistCarousel playlists={newReleases} />
    </div>
  );
};

export default PlaylistsGallery;
