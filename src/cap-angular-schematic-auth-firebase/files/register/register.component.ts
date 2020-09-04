import { Component, OnInit } from '@angular/core';
import { Register, RegisterJWT } from 'cap-authentication-firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  userRegisterData(UserData: Register) {
    // console.log(UserData);
  }

  userRegisterError(UserError: any) {
    // console.log(UserError);
  }

  userRegisterJWT(JWT: RegisterJWT) {
    // console.log(JWT);
  }

}
