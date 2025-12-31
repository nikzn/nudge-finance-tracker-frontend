import { Component, OnDestroy } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from "@angular/router";
import { Authenticationservice } from '../../../shared/services/authenticationservice';
import { Toasterservice } from '../../../shared/services/toasterservice';
import { Loaderservice } from '../../../shared/services/loaderservice';
import { AsyncPipe } from '@angular/common';
import { Loader } from '../../../shared/component/loader/loader';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, PasswordModule, RouterLink,AsyncPipe,Loader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy{

 private destroy$=new Subject<void>();


  constructor(private authenticationService: Authenticationservice,private toasterService:Toasterservice, private router:Router,public loaderService:Loaderservice) {

  }

  loginForm: FormGroup = new FormGroup({
    username_or_email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })



  login() {
 
    if (this.loginForm.valid) {
      
      this.authenticationService.loginApi(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(      
        {next:res => {
          this.toasterService.success("Login Successfull")
          this.router.navigate(['/dashboard'])
      }}
    
    )

    } else {
        this.toasterService.warning("Fill the necessery Fields");

    }


  }

ngOnDestroy(): void {
  this.destroy$.next()
  this.destroy$.complete()
  
}

}
