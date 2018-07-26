// const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyDW8PIGL6vbFaMhRy0PpXtNv_e59eZYmfs",
    authDomain: "auth-social-network.firebaseapp.com",
    databaseURL: "https://auth-social-network.firebaseio.com",
    projectId: "auth-social-network",
    storageBucket: "auth-social-network.appspot.com",
    messagingSenderId: "1041115691430"
};

firebase.initializeApp(config);


window.logIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(e => {
    showWrongPassword();
    // console.log(e);
  });
}

window.facebookAccount = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    let fireUser = result.user;
    providerFacebook(fireUser);
  }).catch(error => {
    // alert(error.message);
  });
}

window.googleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    let fireUser = result.user;
    providerGoogle(fireUser);
  }).catch(error => {
    // console.log(error.message);
  });
}
