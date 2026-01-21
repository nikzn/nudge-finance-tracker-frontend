import { AbstractControl, AsyncValidator, AsyncValidatorFn } from "@angular/forms";
import { Userservice } from "../services/userservice";
import { catchError, map, of, switchMap, timer } from "rxjs";

export function userNameValidator(userService:Userservice):AsyncValidatorFn{
return (control: AbstractControl) => {
  if (!control.value) {
    return of(null);
  }

  return timer(500).pipe( // debounce
    switchMap(() =>
      userService.userNameApi(control.value).pipe(
        map(res => (res.exists ? { usernameTaken: true } : null)),
        catchError(() => of(null)) // fail-safe
      )
    )
  );
};
}
  
