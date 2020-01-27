import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  userNotValid: boolean;
  socialMedia: boolean;
  validatedForm: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.loginUserForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
    this.userNotValid = false;
    this.socialMedia = false;
    this.validatedForm = false;
  }

  ngOnInit() { }

  loginUser() {
    if (this.loginUserForm.valid) {
      this.authenticationService.loginUser(this.loginUserForm.value)
        .then((response) => {
        response.user.getIdTokenResult().then((res) => {
          this.authenticationService.saveCurrentUSer({
            user: response.user.email.split('@', 1)[0],
            email: response.user.email,
            refresh_token: response.user.refreshToken,
            token: res.token
          });
          this.router.navigate(['/']);
        });
        }).catch(error => this.userNotValid = true);
    } else {
      this.validatedForm = true;
    }
  }

  signInSocialMedia(socialMedia: boolean) {
    if (socialMedia) {
      this.authenticationService.authWithFacebook().then((response) => {
        response.user.getIdTokenResult().then((res) => {
          this.authenticationService.saveCurrentUSer({
            user: response.user.email.split('@', 1)[0],
            email: response.user.email,
            refresh_token: response.user.refreshToken,
            token: res.token
          });
        }).then(() => {
          this.router.navigate(['/']);
        });
      }).catch(error => this.userNotValid = true);
    } else {
      this.authenticationService.authWithGoogle().then((response) =>  {
        response.user.getIdTokenResult().then((res) => {
          this.authenticationService.saveCurrentUSer({
            user: response.user.email.split('@', 1)[0],
            email: response.user.email,
            refresh_token: response.user.refreshToken,
            token: res.token
          });
        }).then(() => {
          this.router.navigate(['/']);
        });
      }).catch(error => this.userNotValid = true);
    }
  }
}
