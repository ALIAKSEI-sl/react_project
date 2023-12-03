import { InputProps } from '../models/inputProps.interface';
import styles from '../styles/Forms.module.css';
import Errors from './Errors';

export default function InputName(props: InputProps) {
  const { register, errors } = props;

  return (
    <div className={styles['block-input']}>
      <label htmlFor="name">
        <p>Name:</p>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Please, enter your name',
            pattern: {
              value: /^[A-ZЁА-Я][a-zёа-я]*$/,
              message: 'Please, ensure the first letter is uppercase',
            },
          })}
          placeholder="Name"
        />
      </label>
      <Errors errors={errors.name} />
    </div>
  );
}