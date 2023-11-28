import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      hideAttribution="false"
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: '#109ba8',
        bgColor: 'rgba(36, 44, 55, 0.9)',
        color: '#fff',
        loaderColor: '#fff',
        sliderHandleColor: '#fff',
        sliderColor: '#109ba8',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  );
};

export default Player;

// import React, { useState, useEffect } from "react";

// // const track = {
// //     name: "",
// //     album: {
// //         images: [
// //             { url: "" }
// //         ]
// //     },
// //     artists: [
// //         { name: "" }
// //     ]
// // }

// const Player = ({ accessToken, trackUri }) => {
//   console.log(trackUri);

//   const [is_paused, setPaused] = useState(false);
//   const [is_active, setActive] = useState(false);
//   const [player, setPlayer] = useState(undefined);
//   const [current_track, setTrack] = useState();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;

//     document.body.appendChild(script);

//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const player = new window.Spotify.Player({
//         name: "Web Playback SDK",
//         getOAuthToken: (cb) => {
//           cb(accessToken);
//         },
//         volume: 0.5,
//       });

//       setPlayer(player);

//       player.addListener("ready", ({ device_id }) => {
//         console.log("Ready with Device ID", device_id);
//       });

//       player.addListener("not_ready", ({ device_id }) => {
//         console.log("Device ID has gone offline", device_id);
//       });

//       player.addListener("player_state_changed", (state) => {
//         if (!state) {
//           return;
//         }

//         setTrack(state.track_window.current_track);
//         setPaused(state.paused);

//         player.getCurrentState().then((state) => {
//           !state ? setActive(false) : setActive(true);
//         });
//       });

//       player.connect();
//     };
//   }, [accessToken]);

//   if (!is_active) {
//     return (
//       <>
//         <div className="container">
//           <div className="main-wrapper">
//             <b>
//               {" "}
//               Instance not active. Transfer your playback using your Spotify app{" "}
//             </b>
//           </div>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div className="container">
//           <div className="main-wrapper">
//             <img
//               src={current_track.album.images[0].url}
//               className="now-playing__cover"
//               alt=""
//             />

//             <div className="now-playing__side">
//               <div className="now-playing__name">{current_track.name}</div>
//               <div className="now-playing__artist">
//                 {current_track.artists[0].name}
//               </div>

//               <button
//                 className="btn-spotify"
//                 onClick={() => {
//                   player.previousTrack();
//                 }}
//               >
//                 &lt;&lt;
//               </button>

//               <button
//                 className="btn-spotify"
//                 onClick={() => {
//                   player.togglePlay();
//                 }}
//               >
//                 {is_paused ? "PLAY" : "PAUSE"}
//               </button>

//               <button
//                 className="btn-spotify"
//                 onClick={() => {
//                   player.nextTrack();
//                 }}
//               >
//                 &gt;&gt;
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// };

// export default Player;
