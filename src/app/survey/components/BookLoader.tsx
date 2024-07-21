import styles from "../styles/BookLoader.module.css";

const BookLoader = () => {
  const pages = Array.from({ length: 18 });

  return (
    <div className={styles.book}>
      <div className={styles.inner}>
        <div className={styles.left}></div>
        <div className={styles.middle}></div>
        <div className={styles.right}></div>
      </div>
      <ul>
        {pages.map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
      <a
        className={styles.dribbble}
        href="https://dribbble.com/shots/7199149-Book-Loader"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png"
          alt="Dribbble"
        />
      </a>
    </div>
  );
};

export default BookLoader;
