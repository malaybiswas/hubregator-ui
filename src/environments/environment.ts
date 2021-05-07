// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'development | production',
  firebase: {
    projectId: '<FIREBASE_PROJECT_ID>',
    appId: '<FIREBASE_APP_ID>',
    apiKey: '<GOOGLE_API_KEY>',
    authDomain: 'localhost | <FIREBASE_PROJECT_ID>.firebaseapp.com | <FIREBASE_PROJECT_ID>.web.app',
    databaseURL: 'https://<FIREBASE_PROJECT_ID>.firebaseio.com'
  },
  defaultPreferences: {
    theme: {
      color: 'red | pink | purple | deep-purple | indigo | blue | light-blue | cyan | teal | green | light-green | lime | yellow | amber | orange | deep-orange | brown | grey | blue-grey',
      mode: 'light | dark | auto'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
