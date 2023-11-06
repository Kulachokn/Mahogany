import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

export const addTrackToPlaylist = (playlistId, trackId) => {
  const storedAccessToken = localStorage.getItem("accessToken");
  spotifyApi.setAccessToken(storedAccessToken);
  // Add tracks to a playlist
  spotifyApi
    .addTracksToPlaylist(playlistId, [trackId])
    .then(
      (data) => {
        console.log("Added tracks to playlist!");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};
