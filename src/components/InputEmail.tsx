import { InputProps } from '../models/inputProps.interface';
import styles from '../styles/Forms.module.css';
import Errors from './Errors';

export default function InputEmail(props: InputProps) {
  const { register, errors } = props;

  return (
    <div className={styles['block-input']}>
      <label htmlFor="email">
        <p>Email:</p>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Please, enter your email',
            pattern: {
              value: /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Please, enter a valid email address',
            },
          })}
          placeholder="Email"
        />
      </label>
      <Errors errors={errors.email} />
    </div>
  );
}
