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

  const storedAccessToken = localStorage.getItem("accessToken");
      spotifyApi.setAccessToken(storedAccessToken);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const country = user.country;
      spotifyApi
        .getCategories({
          country: country,
        })
        .then((data) => {
          console.log(data.body.categories);
          setCategories(data.body.categories.items);
        });
    } catch (error) {
      console.error("Something went wrong:", error.message);
    }
  }, []);

  const handleChooseCategory = async (e) => {
    let chosenCategory = e.target.dataset.id;
    console.log(chosenCategory);
    try {
      // const storedAccessToken = localStorage.getItem("accessToken");
      // spotifyApi.setAccessToken(storedAccessToken);

      const user = JSON.parse(localStorage.getItem("user"));
      const country = user.country;

      await spotifyApi
        .getPlaylistsForCategory(chosenCategory, {
          country: country,
          limit: 10,
          offset: 0,
        })
        .then((data) => {
          // console.log(data.body.playlists.items);
          setPlaylistsByCategory(data.body.playlists.items);
        });
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
                className={styles.link}
                onClick={handleChooseCategory}
              >
                {/* <img src={category.icons[0].url} alt={category.name} width='165' height='80' /> */}
                <p data-id={category.id} className={styles.name}>{category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoriesList;
