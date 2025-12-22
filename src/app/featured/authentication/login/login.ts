import { Component } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, PasswordModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

loginForm:FormGroup= new FormGroup({
    email: new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })



}
