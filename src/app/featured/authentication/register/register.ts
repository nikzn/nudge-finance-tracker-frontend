import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, MinLengthValidator } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, PasswordModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  features = [
    'Track all your expenses in one place',
    'Set and achieve savings goals',
    'Get insights with beautiful reports',
    'Budget smarter with AI recommendations'
  ];


  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })



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


  validatePassword() {
    const pwd = this.registerForm.value.password;
    this.passwordValidation = {
      minLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasLowercase: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd)
    };
  }

  onSubmit() {
    console.log('Form submitted:', this.registerForm.value);
    // Add your form submission logic here
  }
}
