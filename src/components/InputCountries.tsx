import { useState } from 'react';

import { InputCountriesProps } from '../models/inputProps.interface';
import { useAppSelector } from '../store/hooks';
import styles from '../styles/ReactHookForm.module.css';

export default function InputCountries(props: InputCountriesProps) {
  const { register, errors, getValues, setValue } = props;

  const countries = useAppSelector((state) => state.countries);

  const [suggestCountries, setSuggestCountries] = useState<string[]>([]);

  const validateCountries = (data: string) => {
    const hints = countries.filter((country) =>
      country.toLocaleLowerCase().startsWith(data.toLocaleLowerCase())
    );
    setSuggestCountries(hints);

    if (hints.length === 1 && hints[0] === data) {
      setSuggestCountries([]);
      return true;
    }

    return 'Please, enter an existing country';
  };

  const setCountries = (country: string) => {
    setValue('countries', country, { shouldValidate: true });
  };

  return (
    <div className={styles['block-input']}>
      <label htmlFor="countries">
        <p>Country:</p>
        <div className={styles['block-input-countries']}>
          <input
            type="text"
            id="countries"
            {...register('countries', {
              required: 'Please, enter your country',
              validate: validateCountries,
            })}
            placeholder="Country"
          />
          {getValues('countries') && (
            <div className={styles['block-hints']}>
              {suggestCountries.map((country, i) => (
                <p
                  className={styles.hint}
                  key={i}
                  onClick={() => setCountries(country)}
                >
                  {country}
                </p>
              ))}
            </div>
          )}
        </div>
      </label>
      {errors?.countries && (
        <p className={styles.error}>{errors.countries.message}</p>
      )}
    </div>
  );
}
