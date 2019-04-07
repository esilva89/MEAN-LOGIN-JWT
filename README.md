# MEAN-Login-JWT

Login implemented with Stack MEAN.

## Goal
The application allows users to register, login using JWT and modify the profile of users.

## Requirements
1. [NodeJS](https://nodejs.org/en/download/) version 10.11.0.
1. NPM version 6.4.1. Included in NodeJS.
1. [MongoDB](https://www.mongodb.com/download-center/community) version 3.6.4.
1. [AngularCLI](https://cli.angular.io/) version 7.3.3.

## Installation
1. Run MongoDB with the following command: `mongod`.
1. Access the client folder and execute the command: `npm install`.
1. Access the client folder and execute the command: `ng build`.
1. Access the root folder of the project and execute the command: `npm install --only=prod`.
1. Access the root folder of the project and execute the command: `npm start`.

## Screenshots
![alt text](https://github.com/esilva89/MEAN-LOGIN-JWT-TEST/blob/master/docs/screenshot-pageHome.jpg "Page Home")
![alt text](https://github.com/esilva89/MEAN-LOGIN-JWT-TEST/blob/master/docs/screenshot-pageRegister.jpg "Page Register")
![alt text](https://github.com/esilva89/MEAN-LOGIN-JWT-TEST/blob/master/docs/screenshot-pageLogin.jpg "Page Login")
![alt text](https://github.com/esilva89/MEAN-LOGIN-JWT-TEST/blob/master/docs/screenshot-pageEditProfile.jpg "Page Edit Profile")
![alt text](https://github.com/esilva89/MEAN-LOGIN-JWT-TEST/blob/master/docs/screenshot-pageEditPassword.jpg "Page Edit Password")

## External Packages
**Client**
1. [Bootstrap](https://getbootstrap.com/): framework css for managing styles.
1. [Font Awesome](https://fontawesome.com/): vector icons and social logos.
1. [angular2-flash-messages](https://www.npmjs.com/package/angular2-flash-messages): module that provides component and service for showing flash messages.
1. [ng-recaptcha](https://www.npmjs.com/package/ng-recaptcha): component for handling reCAPTCHA.
1. [ngx-smart-modal](https://www.npmjs.com/package/ngx-smart-modal): library for managing modals.

**Server**
1. [bcryptjs](https://www.npmjs.com/package/bcryptjs): library for hash passwords.
1. [cors](https://www.npmjs.com/package/cors): middleware for enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
1. [express](https://www.npmjs.com/package/express): framework for node.
1. [express-validator](https://www.npmjs.com/package/express-validator): an express.js middleware for validator.
1. [jwt-simple](https://www.npmjs.com/package/jwt-simple): JWT encode and decode module for node.js.
1. [moment](https://www.npmjs.com/package/moment): library for parsing, validating, manipulating, and formatting dates.
1. [mongoose](https://www.npmjs.com/package/mongoose): a MongoDB object modeling tool designed to work in an asynchronous environment.
1. [mongoose-beautiful-unique-validation](https://www.npmjs.com/package/mongoose-beautiful-unique-validation): turns duplicate errors into regular Mongoose validation errors.

## Improvements
1. Possibility of uploading avatars.
1. Improve the sample of errors in the client (mongoose-beautiful-unique-validation).