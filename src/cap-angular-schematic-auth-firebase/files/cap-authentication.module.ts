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
      apiKey: <%= credentials ? `environment.apiKey` : `'${apiKey}'` %>,
      authDomain: <%= credentials ? `environment.authDomain` : `'${authDomain}'` %>,
      databaseURL: <%= credentials ? `environment.databaseURL` : `'${databaseURL}'` %>,
      projectId: <%= credentials ? `environment.projectId` : `'${projectId}'` %>,
      storageBucket: <%= credentials ? `environment.storageBucket` : `'${storageBucket}'` %>,
      messagingSenderId: <%= credentials ? `environment.messagingSenderId` : `'${senderId}'` %>,
      appId: <%= credentials ? `environment.appId` : `'${appId}'` %>,
      measurementId: <%= credentials ? `environment.measurementId` : `'${measurementId}'` %>
    }),
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ForgotComponent,
    ProfileComponent
  ],
  entryComponents: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ForgotComponent,
    ProfileComponent
  ],
  providers: [AuthenticationService]
})
export class CapAuthenticationModule {
}
