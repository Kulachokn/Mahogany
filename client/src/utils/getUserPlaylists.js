import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export const getUserPlaylists = async () => {
  try {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (!storedAccessToken) {
      throw new Error("Access token is missing. Please login.");
    }
    const user = JSON.parse(window.localStorage.getItem("user"));
    spotifyApi.setAccessToken(storedAccessToken);

    const playlistsData = await spotifyApi.getUserPlaylists(user.id);

    if (!playlistsData || !playlistsData.body || !playlistsData.body.items) {
      throw new Error("Failed to get playlist information.");
    }

    const playlists = playlistsData.body.items;
    return playlists;
  } catch (error) {
    console.error("Something went wrong:", error.message);
    throw error;
  }
};
