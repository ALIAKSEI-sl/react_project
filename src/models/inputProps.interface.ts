import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { IForm } from './form.interface';

export interface InputProps {
  register: UseFormRegister<IForm>;
  errors: FieldErrors<IForm>;
}

export interface InputConfirmPasswordProps {
  register: UseFormRegister<IForm>;
  errors: FieldErrors<IForm>;
  getValues: UseFormGetValues<IForm>;
}

export interface InputCountriesProps {
  register: UseFormRegister<IForm>;
  errors: FieldErrors<IForm>;
  getValues: UseFormGetValues<IForm>;
  setValue: UseFormSetValue<IForm>;
}
