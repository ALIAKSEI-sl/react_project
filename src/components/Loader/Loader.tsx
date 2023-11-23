import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles['container-loader']} data-testid="loader">
      <div className={styles.loader} />
    </div>
  );
}
