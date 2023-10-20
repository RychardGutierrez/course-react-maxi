import { useState } from 'react';

export const useInput = (validateValue) => {
  const [value, setValue] = useState('');
  const [isTocked, setIsTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && isTocked;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const clearInput = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    clearInput,
    valueIsValid,
  };
};
