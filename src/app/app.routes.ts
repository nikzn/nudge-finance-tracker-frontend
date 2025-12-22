import { Routes } from '@angular/router';
import { Homepage } from './featured/homepage/homepage';
import { Login } from './featured/authentication/login/login';
import { Register } from './featured/authentication/register/register';

export const routes: Routes = [
    { path: '', component: Homepage },
    { path: 'login', component: Login },
    { path: 'signup', component: Register }

];
