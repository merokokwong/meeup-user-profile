import * as Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC6A88NuNnydxRId2kLnWgyedC8hDPjmps',
  authDomain: 'meeup-user-profile-page.firebaseapp.com',
  databaseURL: 'https://meeup-user-profile-page.firebaseio.com',
  //  projectId: "meeup-user-profile-page",
  storageBucket: 'meeup-user-profile-page.appspot.com',
  //  messagingSenderId: "819811876953"
};
const firebaseRef = Firebase.initializeApp(config);
export default firebaseRef;
