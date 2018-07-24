// const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyADhe8BrL2a1vVRQnECNe4np96pxkwgoSw",
  authDomain: "salutem-a2461.firebaseapp.com",
  databaseURL: "https://salutem-a2461.firebaseio.com",
  projectId: "salutem-a2461",
  storageBucket: "salutem-a2461.appspot.com",
  messagingSenderId: "953244358481"
};

firebase.initializeApp(config);


window.logIn = (email, password) => {
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => {
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
