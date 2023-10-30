import React from "react";

const PlaylistCard = ({ playlist }) => {
  let playlistImg = "";
  if (playlist.images.length > 0) {
    playlistImg = playlist.images[0].url;
  } else {
    playlistImg =
    "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&q=80&w=2944&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  return (
    <div>
      <img src={playlistImg} alt={playlist.name} width="250" />
      <h2>{playlist.name}</h2>
    </div>
  );
};

export default PlaylistCard;
