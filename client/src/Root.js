import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./components/Header/Header";
import "./index.css";
import styles from './Root.module.css';

const RootLayout = ({ code }) => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.sidenav}>
          <Navigation />
        </div>
        <main className={styles.main}>
          <Outlet code={code} />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
