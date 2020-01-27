import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUserForm: FormGroup;
  userUpdated: boolean;
  user: any;
  errorUpdate: boolean;
  verifiedUser: boolean;
  emailSend: boolean;
  errorEmailSend: boolean;
  validatedForm: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.userUpdated = false;
    this.errorUpdate = false;
    this.verifiedUser = false;
    this.emailSend = false;
    this.errorEmailSend = false;
    this.validatedForm = false;
  }

  ngOnInit() {
    this.getProfile();
  }

  emailToVerifySent() {
    this.authenticationService.verifyEmail();
    this.emailSend = true;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  getProfile() {
    this.authenticationService.currentUser.subscribe((user: any) => {
      if (user) {
        if (user.emailVerified) {
          this.user = user;
          this.profileUserForm = new FormGroup({
            'displayName': new FormControl(user.displayName, [Validators.required])
          });
        } else {
          this.verifiedUser = true;
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  editProfile() {
    if (this.profileUserForm.valid) {
      this.authenticationService.currentUser.subscribe((user: any) => {
        if ( user ) {
          this.authenticationService.updateProfile(this.profileUserForm.value).then((response: any) => {
            this.userUpdated = true;
            setTimeout(() => {
              this.userUpdated = false;
        }, 3000);
          });
        } else {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.validatedForm = true;
    }
  }
}
