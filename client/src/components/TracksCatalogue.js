import React from "react";

const TracksCatalogue = ({ track: { track }, chooseTrack }) => {
    
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <li key={track.id} onClick={handlePlay}>
      <img
        src={track.album.images[0].url}
        alt={track.name}
        width="50"
      />
      <h2>{track.name}</h2>
      <p>{track.artists[0].name}</p>
    </li>
  );
};

export default TracksCatalogue;
