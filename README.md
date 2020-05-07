# cap-angular-schematic-auth-firebase [![Generic badge](https://img.shields.io/badge/CAP-Active-<COLOR>.svg)](https://shields.io/)

## What are schematics?
Schematics are generators that transform an existing filesystem. They can create files, refactor existing files, or move files around.

What distinguishes Schematics from other generators, such as Yeoman or Yarn Create, is that schematics are purely descriptive; no changes are applied to the actual filesystem until everything is ready to be committed. There is no side effect, by design, in Schematics.


## **Previous requirements**
**cap-angular-schematic-auth-firebase** use bootstrap's classes, You can use a CAP product to configure and install bootstrap to your project the installation is as follows.

```
ng add cap-angular-schematic-bootstrap@latest 4.0.0 true
```
![Alt text](https://github.com/software-allies/cap-angular-schematic-auth-firebase/blob/development/assets/images/cap-angular-schematic-bootstrap.png "cap-angular-schematic-bootstrap")

## **Usage**
`Note:` the schematic only works within an angular project.

To run the schematic you have to execute the following command on your terminal.

```
ng add cap-angular-schematic-auth-firebase
```
![Alt text](https://github.com/software-allies/cap-angular-schematic-auth-firebase/blob/development/assets/images/cap-angular-schematic-firebase.png "cap-angular-schematic-bootstrap")

We must have previously created a project on [Firebase platform](https://console.firebase.google.com/u/0/) and enabled authentication methods such as Email/password, Facebook and Google. We will need the credentials in our firebase application right away that the schematic will ask for

* Set your ApiKey: < your-ApiKey >
* Set your Auth Domain: < your-Domain >
* Set your data base URL: < your db-URL >
* Set your Project ID: < your-Project-ID >
* Set your storage bucket: < your-storage-bucket >
* Set your message sender ID: < your-sender-ID >
* Set your app ID: < your-app-ID >
* Set your measurement ID: < your-measurement-ID >

Next, the Schematic will create a component for each of the authentication actions along with the routing configuration.

```
modules
    |
    cap-modules
        |-- forgot/
        |-- login/
        |-- logout/
        |-- profile/
        |-- register/
        |-- routing.ts 
        |-- service.ts
        |-- module.ts
```

Now you can run your server from your angular project that we just modified and open the browser at `http://localhost:4200/` and navigate on the different routes of the components of this schematic.

* Login `/auth/login`

![Alt text](https://github.com/software-allies/cap-angular-schematic-auth-firebase/blob/development/assets/images/login.png "Login")

* Register `/auth/register`

![Alt text](https://github.com/software-allies/cap-angular-schematic-auth-firebase/blob/development/assets/images/register.png "Login")

* Forgot `/auth/forgot-password`

![Alt text](https://github.com/software-allies/cap-angular-schematic-auth-firebase/blob/development/assets/images/forgot.png "Login")

* Profile `/auth/profile`

![Alt text](https://github.com/software-allies/cap-angular-schematic-auth-firebase/blob/development/assets/images/profile.png 
"Login")

* LogOut function 

```
import { AuthenticationService } from 'cap-authentication';

export class Component implements OnInit {
  constructor (public authenticationService: AuthenticationService) { }
  
  logoutFunction() {
   this.authenticationService.signOut() // Return to home page 
  }
}
```


