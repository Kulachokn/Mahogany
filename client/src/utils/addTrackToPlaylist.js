import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

export const addTrackToPlaylist = (playlistId, trackId) => {
  const storedAccessToken = localStorage.getItem("accessToken");
  spotifyApi.setAccessToken(storedAccessToken);
  // Add tracks to a playlist
  spotifyApi
    .addTracksToPlaylist(playlistId, [trackId])
    .then(
      (data) => {
        console.log(data);
        console.log("Added tracks to playlist!");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};
