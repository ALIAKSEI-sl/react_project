import { InputProps } from '../models/inputProps.interface';
import styles from '../styles/Forms.module.css';
import Errors from './Errors';

export default function InputAge(props: InputProps) {
  const { register, errors } = props;

  return (
    <div className={styles['block-input']}>
      <label htmlFor="age">
        <p>Age:</p>
        <input
          type="number"
          id="age"
          {...register('age', {
            required: 'Please, enter your age',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Please, no negative values',
            },
          })}
          placeholder="Age"
        />
      </label>
      <Errors errors={errors.age} />
    </div>
  );
}
