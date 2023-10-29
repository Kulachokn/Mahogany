import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import "./index.css";

const RootLayout = ({ code }) => {
  return (
    <>
      <Header />
      <div>
        <div className="sidenav">
          <Navigation />
        </div>
        <main className="main">
          <Outlet code={code} />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
