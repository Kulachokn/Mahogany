import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";
import { MutatingDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PlaylistCarousel from "../components/Carousel/Carousel";
import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularTracks, setPopularTracks] = useState([]);

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
        });

        await spotifyApi.getArtistAlbums(artistId).then((data) => {
          setArtistAlbums(data.body.items);
          setLoading(false);
          console.log("Artist albums", data.body);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(`Error fetching data: ${error.message}`);
        setLoading(true);
      }
    };
    fetchData();
  }, [artistId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token is missing. Please login.");
          setLoading(true);
          return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const country = user.country;

        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${country}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          console.error(`HTTP Error: ${response.status}`);
          return;
        }

        const res = await response.json();
        setPopularTracks(res.tracks);
        console.log(res);

        if (res.error) return;
        setLoading(false);
      } catch (error) {
        console.error("Something went wrong:", error.message);
        toast.error(`Error fetching data: ${error.message}`);
        setLoading(true);
      }
    };
    fetchData();
  }, [artistId]);

  const backgroundStyle = {
    background: `linear-gradient(to right, rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)), url(${
      artistInfo ? artistInfo.image : ""
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "300px",
    color: "white",
    padding: "20px",
  };

  return (
    <div>
      {loading ? (
        <MutatingDots
          height="100"
          width="100"
          color="#109BA8"
          secondaryColor="#109BA8"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div>
          <div style={backgroundStyle}>
            <h1>{artistInfo.name}</h1>
            <p>{artistInfo.followers} followers</p>
            <p>genres: {artistInfo.genres}</p>
          </div>
          {artistAlbums && (
            <PlaylistCarousel type="album" playlists={artistAlbums} />
          )}
          {popularTracks && (
            <div>
              <h2>Popular Tracks</h2>
              {popularTracks.map((track, ind) => (
                <TrackSearchResult ind={ind}
                track={track}
                key={track.uri} />
              ))}
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ArtistPage;
