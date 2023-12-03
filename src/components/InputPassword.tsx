import { InputProps } from '../models/inputProps.interface';
import styles from '../styles/Forms.module.css';
import Errors from './Errors';

export default function InputPassword(props: InputProps) {
  const { register, errors } = props;

  return (
    <div className={styles['block-input']}>
      <label htmlFor="password">
        <p>Password:</p>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Please, enter your password',
            pattern: {
              value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).{4,}$/,
              message:
                'Please, 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
            },
          })}
          placeholder="Password"
        />
      </label>
      <Errors errors={errors.password} />
    </div>
  );
}
