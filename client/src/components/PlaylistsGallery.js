import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

import { getUserPlaylists } from "../utils/getUserPlaylists";
import {convertDate} from "../utils/convertDate";
import PlaylistsContainer from "./PlaylistsContainer/PlaylistsContainer";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
  });

const PlaylistsGallery = ({updateSavedPlaylists}) => {
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists"));

    const [userPlaylists, setUserPlaylists] = useState(savedPlaylists);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

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
        try {
          spotifyApi.setAccessToken(storedAccessToken);
          const user = JSON.parse(localStorage.getItem("user"));
          const country = user.country;
    
          const timestamp = convertDate(Date.now());
    
          spotifyApi
            .getFeaturedPlaylists({
              limit: 6,
              offset: 1,
              country: country,
              timestamp: timestamp,
            })
            .then((data) => {
                setFeaturedPlaylists(data.body.playlists.items)
              }
            );
        } catch (error) {
          console.error("Something went wrong:", error.message);
        }
      }, [storedAccessToken]);

    return (
        <div>
            {userPlaylists && <PlaylistsContainer playlists={userPlaylists} />}
            <PlaylistsContainer playlists={featuredPlaylists}/>
        </div>
    );
};

export default PlaylistsGallery;