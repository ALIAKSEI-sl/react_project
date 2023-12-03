import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import {
  InputAcceptance,
  InputAge,
  InputConfirmPassword,
  InputCountries,
  InputEmail,
  InputGender,
  InputImg,
  InputName,
  InputPassword,
} from '../components/index';
import { IForm } from '../models/form.interface';
import { addForm } from '../store/forms.slice';
import { useAppDispatch } from '../store/hooks';
import styles from '../styles/Forms.module.css';

export default function ReactHookFormPage() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: 'onChange' });

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const { img } = data;
    const file = img[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;

      const action = addForm({ ...data, img: base64String });
      dispatch(action);
      navigation('/');
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Link to="/" className={styles.back}>
        Back to main page
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputName register={register} errors={errors} />
        <InputAge register={register} errors={errors} />
        <InputEmail register={register} errors={errors} />
        <InputPassword register={register} errors={errors} />
        <InputConfirmPassword
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <InputGender register={register} errors={errors} />
        <InputAcceptance register={register} errors={errors} />
        <InputImg register={register} errors={errors} />
        <InputCountries
          register={register}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
        />
        <button type="submit" className={styles.submit} disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
}
