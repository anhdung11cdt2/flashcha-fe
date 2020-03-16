// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const flashcha = 'http://68.183.182.232'
const local = 'http://127.0.0.1:3000'
const end_point = local
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
  languages: end_point + '/languages',
  levels: end_point + '/levels',
  courses: end_point + '/courses',
  lessons: end_point + '/lessons',
  flash_cards: end_point + '/flash_cards',
  card_translations: end_point + '/card_translations'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
