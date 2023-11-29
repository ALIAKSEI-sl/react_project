import { Link } from 'react-router-dom';

import styles from '../styles/Main.module.css';

export default function MainPage() {
  return (
    <header className={styles.header}>
      <Link to="reactHookForm">form witch React Hook Form</Link>
      <Link to="uncontrolledComponents">
        form witch uncontrolled components
      </Link>
    </header>
  );
}
