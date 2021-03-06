import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyComponent } from './verify/verify.component';

import { CanActivaInService } from './canActivate-in.service';
import { CanActivaOutService } from './canActivate-out.service';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'register', component: RegisterComponent, canActivate: [CanActivaOutService]},
      { path: 'login', component: LoginComponent, canActivate: [CanActivaOutService]},
      { path: 'forgot-password', component: ForgotComponent, canActivate: [CanActivaOutService]},
      { path: 'profile', component : ProfileComponent, canActivate: [CanActivaInService]},
      { path: 'logout', component: LogoutComponent, canActivate: [CanActivaInService] },
      { path: 'verify', component: VerifyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
