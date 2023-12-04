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
  const [categoryName, setCategoryName] = useState("");

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
    setCategoryName(e.currentTarget.dataset.name);
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
          <button
            type="button"
            className={styles.leftBtn}
            onClick={handleBackToCategories}
          >
            <svg
              className={styles.iconLeftBtn}
              viewBox="0 0 24 24"
              id="left-arrow icon flat-color"
              data-name="Flat Color"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="primary"
                d="M21,11H5.41l1.3-1.29A1,1,0,0,0,5.29,8.29l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H21a1,1,0,0,0,0-2Z"
              ></path>
            </svg>
          </button>
          <h3>{categoryName && categoryName}</h3>
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
                data-name={category.name}
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
