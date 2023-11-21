import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export const addTrackToPlaylist = async (playlistId, trackId) => {
  try {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (!storedAccessToken) {
      throw new Error("Access token is missing. Please login.");
    }
    spotifyApi.setAccessToken(storedAccessToken);

    const data = await spotifyApi.addTracksToPlaylist(playlistId, [trackId]);

    if (data && data.body && data.body.snapshot_id) {
      console.log("Added tracks to playlist!");
      console.log(data);
    } else {
      throw new Error("Failed to add tracks to the playlist.");
    }
  } catch (error) {
    console.error("Something went wrong:", error.message);
    throw error;
  }
};
