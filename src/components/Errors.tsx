import { FieldError } from 'react-hook-form';

import styles from '../styles/Forms.module.css';

interface InputErrorsProps {
  errors: FieldError | undefined;
}

export default function InputErrors(props: InputErrorsProps) {
  const { errors } = props;

  return (
    <div className={styles['errors-block']}>
      {errors && <p className={styles.error}>{errors.message}</p>}
    </div>
  );
}
