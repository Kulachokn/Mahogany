import { Link } from "react-router-dom";

import styles from "./ArtistCard.module.css";

const ArtistCard = ({ artist }) => {

  return (
    <li className={styles.item}>
      <div className={styles.imgWrap}>
        <img
          src={artist.images[2].url}
          alt={artist.name}
          className={styles.img}
        />
      </div>
      <div className={styles.thumb}>
        <h2 className={styles.title}>{artist.name}</h2>
        <h3 className={styles.artist}>Artist</h3>
        <Link to={`/artists/${artist.id}`} className={styles.link}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.playIcon}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                opacity="0.5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              />
              <path
                d="M15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868V9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059Z"
              />
            </g>
          </svg>
        </Link>
      </div>
    </li>
  );
};

export default ArtistCard;
