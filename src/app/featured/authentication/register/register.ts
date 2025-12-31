import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, MinLengthValidator, FormBuilder } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from "@angular/router";
import { Authenticationservice } from '../../../shared/services/authenticationservice';
import { passwordStrengthValidator } from '../../../shared/validators/customPassword.validator';
import { whiteSpaceValidator } from '../../../shared/validators/whiteSpace.validator';
import { Userservice } from '../../../shared/services/userservice';
import { userNameValidator } from '../../../shared/validators/userName.validator';
import { Toasterservice } from '../../../shared/services/toasterservice';
import { Loader } from "../../../shared/component/loader/loader";
import { Loaderservice } from '../../../shared/services/loaderservice';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, PasswordModule, RouterLink, ReactiveFormsModule, Loader],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

   private destroyRef = inject(DestroyRef);

  constructor(private authenticationService: Authenticationservice, private userService: Userservice, private fb: FormBuilder, private toastService: Toasterservice, public loaderService: Loaderservice,private route:Router) {
    this.registerForm = this.fb.group({
      username: [
        '',
        [Validators.required, whiteSpaceValidator],
        [userNameValidator(this.userService)]
      ],
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]]
    });
  }


  features = [
    'Track all your expenses in one place',
    'Set and achieve savings goals',
    'Get insights with beautiful reports',
    'Budget smarter with AI recommendations'
  ];


  registerForm: FormGroup;



  showPassword = false;
  focusedField: string | null = null;

  passwordValidation = {
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get password() {
    return this.registerForm.get('password');
  }

  get name() {
    return this.registerForm.get('username')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get fullName() {
    return this.registerForm.get('full_name')
  }


  onSubmit(): void {
    console.log('Form submitted:', this.registerForm.value);

    if (this.registerForm.invalid) {
      this.toastService.info('Please fill all required fields correctly', 8000);
      return;
    }

    this.authenticationService
      .registerApi(this.registerForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('Registration success:', res);
          this.toastService.success('Registration successful');
          this.route.navigate(['/login'])
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.toastService.error(
            err?.error?.message || 'Registration failed. Try again'
          );
        }
      });
  }

}
