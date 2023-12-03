import { InputConfirmPasswordProps } from '../models/inputProps.interface';
import styles from '../styles/Forms.module.css';
import Errors from './Errors';

export default function InputConfirmPassword(props: InputConfirmPasswordProps) {
  const { register, errors, getValues } = props;

  return (
    <div className={styles['block-input']}>
      <label htmlFor="confirmPassword">
        <p>Confirm&nbsp;password:</p>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Please, confirm your password',
            validate: (value) =>
              getValues('password') === value || "Password doesn't match",
          })}
          placeholder="Password"
        />
      </label>
      <Errors errors={errors.confirmPassword} />
    </div>
  );
}
