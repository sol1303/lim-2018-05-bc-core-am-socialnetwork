// para correr los test debe ser descomentarse la linea
const firebase = require("firebase");

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
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(e => {
    showWrongPassword();
    // console.log(e);
  });
}

window.facebookAccount = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    providerFacebook(result.user);
  }).catch(error => {
    // alert(error.message);
  });
}

window.googleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    providerGoogle(result.user);
  }).catch(error => {
    // console.log(error.message);
  });
}

// window.createUser = () => {}
