// eslint-disable-next-line
import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Errors {
  const ValidationError: Errors = {};

  err.inner.forEach(error => {
    ValidationError[error.path] = error.message;
  });

  return ValidationError;
}
