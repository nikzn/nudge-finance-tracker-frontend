import { Routes } from '@angular/router';
import { Homepage } from './featured/homepage/homepage';
import { Login } from './featured/authentication/login/login';
import { Register } from './featured/authentication/register/register';
import { Content } from './content/content';
import { Dashboard } from './dashboard/dashboard';
import { Sidemenu } from './sidemenu/sidemenu';
import { NotFound } from './shared/component/not-found/not-found';
import { WorkInProgress } from './shared/component/work-in-progress/work-in-progress';
import { PageNotFound } from './shared/component/page-not-found/page-not-found';
import { AccessDenied } from './shared/component/access-denied/access-denied';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Homepage },
    { path: 'login', component: Login },
    { path: 'signup', component: Register },
    {path:'access-denied',component:AccessDenied},
    {path:'work-in-progress',component:WorkInProgress},
    {path:'server-error',component:NotFound},
    {
        path: '', component: Sidemenu,canActivateChild:[authGuard]  ,children: [
            { path: 'dashboard', component:WorkInProgress }
        ]
    },
    {path:"**",component:PageNotFound}
];
