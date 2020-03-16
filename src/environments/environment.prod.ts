const flashcha = 'http://68.183.182.232'
const end_point = flashcha
export const environment = {
  production: true,
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
