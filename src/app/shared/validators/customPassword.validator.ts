import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordStrengthValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const pwd: string = control.value || '';

  if (!pwd) return null;

  const errors: ValidationErrors = {};

  if (pwd.length < 8) errors['minLength'] = true;
  if (!/[A-Z]/.test(pwd)) errors['hasUppercase'] = true;
  if (!/[a-z]/.test(pwd)) errors['hasLowercase'] = true;
  if (!/\d/.test(pwd)) errors['hasNumber'] = true;
  if(/\s/.test(pwd)) errors['hasSpace'] = true

  return Object.keys(errors).length ? errors : null;
};
