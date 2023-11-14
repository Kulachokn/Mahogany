import styles from "./Header.module.css";
import Logo from "../Logo";
// import logo from '../../assets/images/headphones-square-sound-svgrepo-com.svg';
// import logo from '../../assets/images/logo.svg';
// import logo from '../../assets/images/music-bars-svgrepo-com (1).svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logoLink}>
        <Logo />
        <span className={styles.logoText}>Mahogany</span>
      </a>
    </header>
  );
};

export default Header;
