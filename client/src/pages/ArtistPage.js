import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-node";
import { MutatingDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PlaylistCarousel from "../components/Carousel/Carousel";
import TrackSearchResult from "../components/TrackSearchResult/TrackSearchResult";
import ArtistCard from "../components/ArtistCard/ArtistCard";
import styles from "./ArtistPage.module.css";
import Player from "../components/Player";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularTracks, setPopularTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [showMoreCards, setShowMoreCards] = useState(false);
  const [playingTrack, setPlayingTrack] = useState();

  const accessToken = localStorage.getItem("accessToken");
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [artistId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await spotifyApi.getArtist(artistId).then((data) => {
          //   const getBiggestArtistImage = (data) => {
          //     console.log(data.body);
          //     return data.body.images.reduce((biggest, picture) => {
          //       if (picture.height > biggest.height) return picture;
          //       return biggest;
          //     }, data.body.images[0]);
          //   };
          const artistGenre = data.body.genres.map((genre) => genre).join(", ");
          const artist = {
            // image: getBiggestArtistImage(data).url,
            image: data.body.images[0].url,
            name: data.body.name,
            followers: data.body.followers.total,
            genres: artistGenre,
          };

          setArtistInfo(artist);
        });

        await spotifyApi.getArtistAlbums(artistId).then((data) => {
          setArtistAlbums(data.body.items);
          setLoading(false);
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

        const responsePopularTracks = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${country}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!responsePopularTracks.ok) {
          console.error(`HTTP Error: ${responsePopularTracks.status}`);
          return;
        }

        const popTracksList = await responsePopularTracks.json();
        setPopularTracks(popTracksList.tracks);

        if (popTracksList.error) return;
        setLoading(false);

        const responseRelatedArtists = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!responseRelatedArtists.ok) {
          console.error(`HTTP Error: ${responseRelatedArtists.status}`);
          return;
        }

        const relatedArtistsList = await responseRelatedArtists.json();
        setRelatedArtists(relatedArtistsList.artists);

        if (relatedArtistsList.error) return;
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
    backgroundImage: `linear-gradient(to right, rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)), url(${
      artistInfo ? artistInfo.image : ""
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    color: "white",
    padding: "20px",
  };

  const toggleSeeMoreCards = () => {
    setShowMoreCards(!showMoreCards);
  };

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <>
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
        <div className={styles.wrapper}>
          <div style={backgroundStyle}>
            <h1>{artistInfo.name ? artistInfo.name : "artist"}</h1>
            <p>{artistInfo.followers} followers</p>
            <p>genres: {artistInfo.genres}</p>
          </div>
          {popularTracks && (
            <div>
              <h2 className="title">Popular Tracks</h2>
              {popularTracks.map((track, ind) => (
                <TrackSearchResult ind={ind} track={track} key={track.uri} chooseTrack={chooseTrack} />
              ))}
            </div>
          )}
          {artistAlbums && (
            <div>
              <h2 className="title">Discography</h2>
              <PlaylistCarousel type="album" playlists={artistAlbums} />
            </div>
          )}
          {relatedArtists && (
            <div className={styles.relatedArtistsWrap}>
              <h2 className="title">Fans also like</h2>
              <button onClick={toggleSeeMoreCards}>
                {showMoreCards ? "See Less" : "See More"}
              </button>
              <ul className={styles.relatedArtistsList}>
                {relatedArtists
                  .slice(0, showMoreCards ? relatedArtists.length : 4)
                  .map((artist, ind) => (
                    <ArtistCard artist={artist} ind={ind} key={artist.uri} />
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
       <div className="player">
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default ArtistPage;
