import logo from "../../assets/images/logo-icon.svg";
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <img src={logo} alt="Mahogany" />
        Mahogany
      </a>
    </header>
  );
};

export default Header;
