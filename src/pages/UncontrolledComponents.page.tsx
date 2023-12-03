import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

import InputErrorsYup from '../components/ErrorsYup';
import { IForm, IFormYup } from '../models/form.interface';
import { Errors, schema } from '../schemes/schema';
import { addForm } from '../store/forms.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import styles from '../styles/Forms.module.css';

export default function UncontrolledComponentsPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptanceRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const countries = useAppSelector((state) => state.countries);

  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IFormYup = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      acceptance: acceptanceRef.current?.checked,
      img: imgRef.current?.files,
      countries: countryRef.current?.value,
    };

    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        setErrors({});
        const value = data as IForm;
        const { img } = value;
        const [file] = img;

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;

          const action = addForm({ ...value, img: base64String });
          dispatch(action);
          navigation('/');
        };

        reader.readAsDataURL(file);
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          const errorValidation: { [key: string]: string } = {};
          error.inner.forEach((e) => {
            if (typeof e.path === 'string') {
              errorValidation[e.path] = e.message;
            }
          });
          setErrors(errorValidation);
        }
      });
  };

  return (
    <>
      <Link to="/" className={styles.back}>
        Back to main page
      </Link>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles['block-input']}>
          <label htmlFor="name">
            <p>Name:</p>
            <input id="name" type="text" placeholder="Name" ref={nameRef} />
          </label>
          <InputErrorsYup errors={errors.name} />
        </div>

        <div className={styles['block-input']}>
          <label htmlFor="age">
            <p>Age:</p>
            <input type="number" id="age" placeholder="Age" ref={ageRef} />
          </label>
          <InputErrorsYup errors={errors.age} />
        </div>

        <div className={styles['block-input']}>
          <label htmlFor="email">
            <p>Email:</p>
            <input type="email" id="email" placeholder="Email" ref={emailRef} />
          </label>
          <InputErrorsYup errors={errors.email} />
        </div>

        <div className={styles['block-input']}>
          <label htmlFor="password">
            <p>Password:</p>
            <input
              type="password"
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </label>
          <InputErrorsYup errors={errors.password} />
        </div>

        <div className={styles['block-input']}>
          <label htmlFor="confirmPassword">
            <p>Confirm&nbsp;password:</p>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Password"
              ref={confirmPasswordRef}
            />
          </label>
          <InputErrorsYup errors={errors.confirmPassword} />
        </div>

        <div className={styles['block-input']}>
          <label htmlFor="gender">
            <p>Gender:</p>
            <select id="gender" ref={genderRef}>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </label>
          <InputErrorsYup errors={errors.gender} />
        </div>

        <div className={styles['block-acceptance']}>
          <label htmlFor="acceptance">
            <input type="checkbox" id="acceptance" ref={acceptanceRef} />
            <p>Acceptance</p>
          </label>
          <InputErrorsYup errors={errors.acceptance} />
        </div>

        <div className={styles['block-input']}>
          <label htmlFor="img">
            <p>Image</p>
            <input type="file" id="img" accept=".png, .jpeg" ref={imgRef} />
          </label>
          <InputErrorsYup errors={errors.img} />
        </div>

        <div className={styles['block-input']}>
          <label htmlFor="country">
            <p>Country:</p>
            <div className={styles['block-input-countries']}>
              <input
                type="text"
                id="country"
                placeholder="Country"
                list="countries"
                ref={countryRef}
              />
            </div>
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </datalist>
          </label>
          <InputErrorsYup errors={errors.countries} />
        </div>

        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </>
  );
}
