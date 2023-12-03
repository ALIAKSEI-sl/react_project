import { InputProps } from '../models/inputProps.interface';
import styles from '../styles/ReactHookForm.module.css';

export default function InputAcceptance(props: InputProps) {
  const { register, errors } = props;

  return (
    <div className={styles['block-acceptance']}>
      <label htmlFor="acceptance">
        <input
          type="checkbox"
          id="acceptance"
          {...register('acceptance', {
            required: 'Please, accept',
          })}
        />
        <p>Acceptance</p>
      </label>
      {errors?.acceptance && (
        <p className={styles.error}>{errors.acceptance.message}</p>
      )}
    </div>
  );
}
