import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import PlaylistPage from "./pages/PlaylistPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Root";
import Library from "./pages/Library";

const code = new URLSearchParams(window.location.search).get('code');

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout code={code} />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard code={code} /> },
      { path: "/:playlistId", element: <PlaylistPage code={code} /> },
      { path: "/library", element: <Library code={code} /> },
     
    ],
  },
]);

function App() {
  return code ? <RouterProvider router={router} code={code}/> : <Login/>
}

export default App;
