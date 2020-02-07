// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBOEzcdtA8P896p606_NCi-Tx24yZ5VSjM",
    authDomain: "flashcha-c9d4a.firebaseapp.com",
    databaseURL: "https://flashcha-c9d4a.firebaseio.com",
    projectId: "flashcha-c9d4a",
    storageBucket: "flashcha-c9d4a.appspot.com",
    messagingSenderId: "429478608778",
    appId: "1:429478608778:web:7c51e27c42da351fc4d273",
    measurementId: "G-YSEKF7WXN7"
  },
  languages: 'http://68.183.182.232/languages',
  levels: 'http://68.183.182.232/levels',
  courses: 'http://68.183.182.232/courses',
  lessons: 'http://68.183.182.232/lessons',
  flash_cards: 'http://68.183.182.232/flash_cards',
  card_translations: 'http://68.183.182.232/card_translations'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
