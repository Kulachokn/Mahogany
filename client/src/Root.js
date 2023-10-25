import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import './index.css';

const RootLayout = ({ code }) => {
  return (
    <>
      <div className="sidenav">
        <Navigation />
      </div>
      <main className="main">
        <Outlet code={code} />
      </main>
    </>
  );
};

export default RootLayout;
