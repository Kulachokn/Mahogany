import { Link } from "react-router-dom";

import styles from "./ArtistCard.module.css";

const ArtistCard = ({artist}) => {

    // console.log(artist);
    return (
        <div className={styles.item}>
      <Link to={`/artists/${artist.id}`} className={styles.link}>
        <div className={styles.imgWrap}>
          {/* <img src={playlistImg} alt={artist.name} width="100%" /> */}
        </div>
        <div className={styles.thumb}>
          <h2 className={styles.title}>{artist.name}</h2>
        </div>
      </Link>
    </div>
    );
};

export default ArtistCard;