import { InputProps } from '../models/inputProps.interface';
import styles from '../styles/Forms.module.css';

export default function InputGender(props: InputProps) {
  const { register } = props;

  return (
    <div className={styles['block-input']}>
      <label htmlFor="gender">
        <p>Gender:</p>
        <select id="gender" {...register('gender')}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </label>
    </div>
  );
}
