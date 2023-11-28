import { Link } from "react-router-dom";
import styles from './CategoryList.module.css';

const CategoriesList = ({ categories }) => {

  const getRandomColor = () => {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);

    const randomColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
  
    return randomColor;
  }

  console.log(getRandomColor());

  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <li key={category.id} className={styles.item} style={{background: `${getRandomColor()}`}}>
          <Link to={category.href}>
            <p className={styles.name}>{category.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
