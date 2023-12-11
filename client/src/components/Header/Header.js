import styles from "./Header.module.css";
import Logo from "../Logo";
import { useToggleTheme } from '../../ThemeContext';

const Header = () => {

  const toggleTheme = useToggleTheme();
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logoLink}>
        <Logo />
        <span className={styles.logoText}>Mahogany</span>
      </a>
      <label className={styles.switch}>
            <input type="checkbox" onChange={toggleTheme} />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    </header>
  );
};

export default Header;
