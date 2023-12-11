import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./Root";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";

import PlaylistPage from "./pages/PlaylistPage";
import AlbumPage from "./pages/AlbumPage";
import { ThemeProvider } from './ThemeContext';

const code = new URLSearchParams(window.location.search).get('code');

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout code={code} />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard code={code} /> },
      { path: "albums/:albumId", element: <AlbumPage code={code} /> },
      { path: "playlists/:playlistId", element: <PlaylistPage code={code} /> },
      { path: "/library", element: <Library code={code} /> },
     
    ],
  },
]);

function App() {
  return code ? <ThemeProvider><RouterProvider router={router} code={code}/></ThemeProvider> : <Login/>
}

export default App;
