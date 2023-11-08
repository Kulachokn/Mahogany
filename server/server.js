require("dotenv").config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
        // res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
        // res.sendStatus(400);
    });
});

app.listen(3001);

// require("dotenv").config()
// const cors = require("cors");

// const express = require('express');
// const session = require('express-session');
// const SpotifyWebApi = require('spotify-web-api-node');

// const app = express();
// app.use(cors());

// app.use(session({
//   secret: process.env.CLIENT_SECRET,
//   resave: true,
//   saveUninitialized: true
// }));

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID, 
//   clientSecret: process.env.CLIENT_SECRET,
//   redirectUri: process.env.REDIRECT_URI 
// });

// // Генерация URL для авторизации
// app.get('/login', (req, res) => {
//   const authorizeURL = spotifyApi.createAuthorizeURL([
//     'user-read-private', 'user-read-email'], 'some-state', true, 'token');
//   res.redirect(authorizeURL);
// });

// app.get('/callback', (req, res) => {
//   const code = req.query.code;

//   spotifyApi.authorizationCodeGrant(code)
//     .then(data => {
//       const accessToken = data.body['access_token'];
//       const refreshToken = data.body['refresh_token'];

//       req.session.accessToken = accessToken;
//       req.session.refreshToken = refreshToken;

//       res.redirect('/');
//     })
//     .catch(err => {
//       console.error('Ошибка авторизации:', err);
//       res.status(500).send('Ошибка авторизации');
//     });
// });

// app.get('/', (req, res) => {
//   if (req.session.accessToken) {

//     spotifyApi.setAccessToken(req.session.accessToken);

//     spotifyApi.getMe()
//       .then(data => {
//         res.send(`Привет, ${data.body.display_name}`);
//       })
//       .catch(err => {
//         console.error('Ошибка при получении информации о пользователе:', err);
//         res.status(500).send('Ошибка');
//       });
//   } else {
//     res.send('Вы не авторизованы. <a href="/login">Войти с помощью Spotify</a>');
//   }
// });

// app.listen(3000, () => {
//   console.log('Сервер запущен на порту 3000');
// });