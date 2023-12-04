import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { useState, useEffect } from "react";

import { getRandomColor } from "../../utils/getRandomColor";
import PlaylistCarousel from "../Carousel/Carousel";
import styles from "./CategoryList.module.css";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const CategoriesList = () => {
  const [playlistsByCategory, setPlaylistsByCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    spotifyApi.setAccessToken(storedAccessToken);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const country = user.country;
        const data = await spotifyApi.getCategories({ country });
        setCategories(data.body.categories.items);
      } catch (error) {
        console.error("Something went wrong:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleChooseCategory = async (e) => {
    let chosenCategory = e.currentTarget.dataset.id;
    console.log(e.target);
    console.log(e.currentTarget);
    console.log(chosenCategory);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const country = user.country;
      const data = await spotifyApi.getPlaylistsForCategory(chosenCategory, {
        country,
        limit: 10,
        offset: 0,
      });
      setPlaylistsByCategory(data.body.playlists.items);
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  const handleBackToCategories = () => setPlaylistsByCategory([]);

  return (
    <>
      {playlistsByCategory.length > 0 ? (
        <>
          <button type="button" onClick={handleBackToCategories}>
            Back to Categories
          </button>
          <h3>By chosen category</h3>
          <PlaylistCarousel playlists={playlistsByCategory} />
        </>
      ) : (
        <ul className={styles.list}>
          {categories.map((category) => (
            <li
              key={category.id}
              className={styles.item}
              style={{ background: getRandomColor() }}
            >
              <Link
                to="#"
                data-id={category.id}
                className={styles.link}
                onClick={handleChooseCategory}
              >
                {/* <img src={category.icons[0].url} alt={category.name} width='165' height='80' /> */}
                <p className={styles.name}>{category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoriesList;
