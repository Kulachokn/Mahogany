import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "62123b4608c441cb9d53b6c93a965bac",
});

const Library = ({ code }) => {
const accessToken = localStorage.getItem("accessToken");
console.log(accessToken);

spotifyApi.setAccessToken(accessToken);
  const [savedTracks, setSavedTracks] = useState([]);



  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMySavedTracks({
        limit: 10,
        offset: 1,
      })
      .then(
        function (data) {
          console.log(data);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <h1>My Library</h1>
    </Container>
  );
};

export default Library;
