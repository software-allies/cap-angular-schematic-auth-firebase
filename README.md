# cap-angular-schematic-auth-firebase [![Generic badge](https://img.shields.io/badge/CAP-Active-<COLOR>.svg)](https://shields.io/)

## What are schematics?
Schematics are generators that transform an existing filesystem. They can create files, refactor existing files, or move files around.

What distinguishes Schematics from other generators, such as Yeoman or Yarn Create, is that schematics are purely descriptive; no changes are applied to the actual filesystem until everything is ready to be committed. There is no side effect, by design, in Schematics.

## **`Important!`**
In order to use the scheme globally in any Angular project on your PC, you must do the installation globally.
```
npm i -g cap-angular-schematic-auth-firebase
```

## **Previous requirements**
**cap-angular-schematic-auth-firebase** use bootstrap's classes. To be able to display the component in the right way. Schematic install bootstrap automatically to the most recent version and you have to configure the `angular.json` and write into `styles` [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/download/):

```
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.scss"
]
```

## **Usage**
`Note:` the schematic only works within an angular project.

To run the schematic you have to execute the following command on your terminal.

```
ng g cap-angular-schematic-auth-firebase:cap-angular-schematic-auth-firebase
```
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

