import React from "react";
import { Link } from "react-router-dom";

import styles from "./PlaylistCard.module.css";

const PlaylistCard = ({ playlist }) => {
  let playlistImg = "";
  if (playlist.images.length > 0) {
    playlistImg = playlist.images[0].url;
  } else {
    playlistImg =
      "https://images.unsplash.com/photo-1590952186016-798811273a82?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  return (
      <Link to={playlist.id} className={styles.link}>
        <div className={styles.imgWrap}>
          <img src={playlistImg} alt={playlist.name} width="200" height="200"/>
        </div>
        <div className={styles.thumb}>
          <h2 className={styles.title}>{playlist.name}</h2>
        </div>
      </Link>
  );
};

export default PlaylistCard;
