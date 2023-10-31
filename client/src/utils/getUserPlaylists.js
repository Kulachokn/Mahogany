import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

export const getUserPlaylists = () => {
  const user_id = window.localStorage.getItem("user_id");
  const storedAccessToken = localStorage.getItem("accessToken");
  spotifyApi.setAccessToken(storedAccessToken);
  // Get a user's playlists

  return spotifyApi
    .getUserPlaylists(user_id)
    .then((data) => data.body.items)
    .catch((err) => console.log(err.message));
};