import { Link } from 'react-router-dom';

import Card from '../components/Card';
import { useAppSelector } from '../store/hooks';
import styles from '../styles/Main.module.css';

export default function MainPage() {
  const forms = useAppSelector((state) => state.forms);

  return (
    <>
      <header className={styles.header}>
        <Link to="reactHookForm">form witch React Hook Form</Link>
        <Link to="uncontrolledComponents">
          form witch uncontrolled components
        </Link>
      </header>
      <main className={styles.main}>
        {forms.map((form, i) => (
          <Card data={form} key={i} isLast={forms.length === i + 1} />
        ))}
      </main>
    </>
  );
}
