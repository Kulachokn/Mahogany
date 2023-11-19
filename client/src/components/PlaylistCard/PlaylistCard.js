import React from "react";
import { Link } from "react-router-dom";

import styles from "./PlaylistCard.module.css";

const PlaylistCard = ({ playlist }) => {
  let playlistImg = "";
  if (playlist.images.length > 0) {
    playlistImg = playlist.images[0].url;
  } else {
    playlistImg =
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&q=80&w=2944&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  return (
    <li className={styles.item}>
      <Link to={playlist.id} className={styles.link}>
        <div className={styles.imgWrap}>
          <img src={playlistImg} alt={playlist.name} width="200" />
        </div>
        <div className={styles.thumb}>
          <h2 className={styles.title}>{playlist.name}</h2>
        </div>
      </Link>
    </li>
  );
};

export default PlaylistCard;
