import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './cap-auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication.service';
import { VerifyComponent } from './verify/verify.component';
import { AuthenticationModule } from 'cap-authentication-firebase';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule.forRoot({
      endPoint: '<%=endPoint%>'
    }),
    AngularFireModule.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      databaseURL: environment.databaseURL,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId,
      measurementId: environment.measurementId
    }),
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ForgotComponent,
    ProfileComponent,
    VerifyComponent
  ],
  entryComponents: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ForgotComponent,
    ProfileComponent,
    VerifyComponent
  ],
  providers: [AuthenticationService]
})
export class CapAuthenticationModule {
}
