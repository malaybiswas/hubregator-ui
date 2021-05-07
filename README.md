# HubregatorUi

Hubgregator project integrates across smart home hubs such as Alexa, Google Assistant, SmartThings, Apple Homekit, Ring etc. to provide integration of events and automation across devices managed by each.

It uses [Google Firebase](https://firebase.google.com/) for hosting, authentication and data storage.

## Hosting
1. Create a new [Google Firebase](https://firebase.google.com/) project.
2. Register a web application.
3. Enable Authentication. The supports Email/Password, Phone and Google sign-in options. Enable those for the Firebase project.
4. Enable hosting for Firebase project.
5. Confirm Firestore Database is created for the project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

## Deployment Configuration
The angular build script looks for `environment.dev.ts` and `environment.prod.ts` configuration files. This folder is not maintained in the project. Check `src/environments/environment.ts` for configurations to be added for development and production.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Production deployment to Firebase
1. Install Firebase CLI `npm install -g firebase-tools` or `sudo npm install -g firebase-tools`
2. Log into firebase `firebase login`
3. Initialize your project `firebase init hosting`
4. Deploy to firebase `firebase deploy --only hosting`
