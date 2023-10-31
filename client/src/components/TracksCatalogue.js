import React from "react";

const TracksCatalogue = ({ track, chooseTrack }) => {
  // const handlePlay = () => {
  //     chooseTrack(track);
  //   };
//    console.log(track.track.id);
  return (
    // <li key={track.id} onClick={handlePlay}>
    <li key={track.track.id}>
      <img
        src={track.track.album.images[0].url}
        alt={track.track.name}
        width="50"
      />
      <h2>{track.track.name}</h2>
      <p>{track.track.artists[0].name}</p>
    </li>
  );
};

export default TracksCatalogue;
