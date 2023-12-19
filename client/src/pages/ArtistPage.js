import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const ArtistPage = () => {
    const { artistId } = useParams();
    // const params = useParams();
    console.log(artistId);

//   useEffect(() => {
//     spotifyApi.getArtist("2hazSY4Ef3aB9ATXW7F5w3").then(
//       function (data) {
//         console.log("Artist information", data.body);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );
//   });

  return <div>Artists!</div>;
};

export default ArtistPage;
