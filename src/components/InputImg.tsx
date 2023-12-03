import { InputProps } from '../models/inputProps.interface';
import styles from '../styles/ReactHookForm.module.css';

export default function InputImg(props: InputProps) {
  const { register, errors } = props;

  const validateImage = (data: FileList) => {
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const file = data[0];

    if (file.size > maxFileSize) {
      return 'File size exceeds the allowed limit (5 MB).';
    }

    return true;
  };

  return (
    <div className={styles['block-img']}>
      <label htmlFor="img">
        <input
          type="file"
          id="img"
          accept=".png, .jpeg"
          {...register('img', {
            required: 'Please, select an image',
            validate: validateImage,
          })}
        />
      </label>
      {errors?.img && <p className={styles.error}>{errors.img.message}</p>}
    </div>
  );
}
