import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await spotifyApi.getArtist(artistId).then((data) => {

          const getBiggestArtistImage = (data) => {
            
            return data.body.images.reduce((biggest, picture) => {
              if (picture.height > biggest.height) return picture;
              return biggest;
            }, data.body.images[0]);
          };

          const artistGenre = data.body.genres.map((genre) => genre).join(", ");

          const artist = {
            image: getBiggestArtistImage(data).url,
            name: data.body.name,
            followers: data.body.followers.total,
            genres: artistGenre,
          };

          setArtistInfo(artist);
console.log(artist.image);
          console.log("Artist information");
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [artistId]);

  const backgroundStyle = {
    backgroundImage: `url(${artistInfo ? artistInfo.image : ""})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    height: "300px",
    color: "white",
    padding: "20px",
  };

  return (
    <div>
      {artistInfo ? (
        <div>
          <div style={backgroundStyle}>
            <h1>{artistInfo.name}</h1>
            <p>{artistInfo.followers} followers</p>
            <p>genres: {artistInfo.genres}</p>
          </div>
          {/* <img
            src={artistInfo.image}
            alt={artistInfo.name}
            width="100%"
            height="300"
          /> */}
        </div>
      ) : (
        <p>Loading Info...</p>
      )}
    </div>
  );
};

export default ArtistPage;
