import styles from '../styles/Forms.module.css';

interface InputErrorsProps {
  errors: string | undefined;
}

export default function InputErrorsYup(props: InputErrorsProps) {
  const { errors } = props;

  return (
    <div className={styles['errors-block']}>
      {errors && <p className={styles.error}>{errors}</p>}
    </div>
  );
}
