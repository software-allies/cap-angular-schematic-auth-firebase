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

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    AngularFireModule.initializeApp({
      apiKey: '<%=apiKey%>',
      authDomain: '<%=authDomain%>',
      databaseURL: '<%=databaseURL%>',
      projectId: '<%=projectId%>',
      storageBucket: '<%=storageBucket%>',
      messagingSenderId: '<%=senderId%>',
      appId: '<%=appId%>',
      measurementId: '<%=measurementId%>'
    }),
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ForgotComponent,
    ProfileComponent
  ],
  entryComponents:[
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
