import { useEffect, useState } from 'react';

export const useValidation = (value: string | unknown[], validations: { [x: string]: number; }) => {
  const[isEmpty, setIsEmpty] = useState(true);
  const[minLengthError, setMinLengthError] = useState(true);

  useEffect (()=>
  {for (const validation in validations){
    switch (validation) {

      case 'minLength':
        value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
        break;
      case 'isEmpty':
        value? setIsEmpty(false) : setIsEmpty(true);
        break;
    }
  }
  },[validations, value]);
  return {
    isEmpty,
    minLengthError,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInput = (initialValue: string, validations: any) => {
  const [value, setValue] = useState(initialValue);
  const valid = useValidation(value, validations);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: { target: { value: any; }; }) => {
    setValue(event.target.value);
  };

  return{
    value,
    onChange,
    ...valid};
};

