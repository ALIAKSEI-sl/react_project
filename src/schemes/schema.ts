import * as yup from 'yup';

import countries from '../store/countries.json';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-ZЁА-Я][a-zёа-я]*$/,
      'Please, ensure the first letter is uppercase'
    )
    .required('Please, enter your name'),
  age: yup
    .number()
    .positive('Please, no negative values')
    .integer('Please, enter an integer number')
    .typeError('Please, enter your age')
    .required('Please, enter your age'),
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Please, enter a valid email address'
    )
    .required('Please, enter your email'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).{4,}$/,
      'Please, 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .required('Please, enter your password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Password doesn't match")
    .required('Please, enter your password'),
  gender: yup.string().required(),
  acceptance: yup.boolean().oneOf([true], 'Please, accept'),
  img: yup
    .mixed<FileList>()
    .required('Please, select an image')
    .test('fileSize', 'File size exceeds the allowed limit (5 MB)', (data) => {
      const maxFileSize = 5 * 1024 * 1024; // 5 MB
      const [file] = data;
      if (file) {
        return file.size <= maxFileSize;
      }
      return false;
    }),
  countries: yup
    .string()
    .test('country', 'Please, enter an existing country', (value) => {
      if (value) {
        const isExist = countries.find(
          (country) => country.toLocaleLowerCase() === value.toLocaleLowerCase()
        );
        return !!isExist;
      }
      return false;
    })
    .required('Please, enter your country'),
});

type Data = yup.InferType<typeof schema>;
export type Errors = Partial<Record<keyof Data, string>>;
