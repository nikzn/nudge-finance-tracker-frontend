import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const whiteSpaceValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {

    const value = control.value || '';

    if (!value) return null;



    return value.trim().length === 0 ? { whiteSpace: true } : null


}