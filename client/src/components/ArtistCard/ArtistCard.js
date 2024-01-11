import { Link } from "react-router-dom";

import styles from "./ArtistCard.module.css";

const ArtistCard = ({ artist }) => {
  // console.log(artist);

  return (
    <li className={styles.item}>
      <Link to={`/artists/${artist.id}`} className={styles.link}>
        <div className={styles.imgWrap}>
          <img src={artist.images[2].url} alt={artist.name} className={styles.img}/>
        </div>
        <div className={styles.thumb}>
          <h2 className={styles.title}>{artist.name}</h2>
          <h3 className={styles.artist}>Artist</h3>
        </div>
      </Link>
    </li>
  );
};

export default ArtistCard;
