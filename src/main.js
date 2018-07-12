// sections
let sectionLogIn = document.getElementById("main-log-in");
let sectionSignUp = document.getElementById("main-sign-up");
let sectionResponseLogIn = document.getElementById("response-log-in");
let sectionResponseSignUp = document.getElementById("response-sign-up");
let sectionLogOut = document.getElementById("log-out");

// botones
let btnLogIn = document.getElementById("btn-log-in");
let btnSignUp = document.getElementById("btn-sign-up");
let btnLogOut = document.getElementById("btn-log-out");
let btnGoogleLogIn = document.getElementById("btn-google-log-in");

// inputs
let txtEmailLogIn = document.getElementById("txt-user-mail-login");
let txtPasswordLogIn = document.getElementById("txt-user-password-login");
let txtNameSignUp = document.getElementById("txt-user-name-signup");
let txtEmailSignUp = document.getElementById("txt-user-mail-signup");
let txtPasswordSignUp = document.getElementById("txt-user-password-signup");

// enlaces
let goToSignUp = document.getElementById("go-to-sign-up");
let goToLogIn = document.getElementById("go-to-log-in");

let user = {
  name: '',
  email: '',
  password: ''
}

var config = {
  apiKey: "AIzaSyADhe8BrL2a1vVRQnECNe4np96pxkwgoSw",
  authDomain: "salutem-a2461.firebaseapp.com",
  databaseURL: "https://salutem-a2461.firebaseio.com",
  projectId: "salutem-a2461",
  storageBucket: "salutem-a2461.appspot.com",
  messagingSenderId: "953244358481"
};

firebase.initializeApp(config);

const logOut = () => {
  firebase.auth().signOut().then(() => {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    txtNameSignUp.value = "";
    txtEmailSignUp.value = "";
    txtPasswordSignUp.value = "";
    sectionLogOut.hidden = true;
    sectionResponseLogIn.hidden = true;
    sectionResponseSignUp.hidden = true;
    sectionSignUp.hidden = true;
    sectionLogIn.hidden = false;
    console.log("saliste");
  });
}

const validateLogIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      sectionLogIn.hidden = true;
      sectionResponseLogIn.hidden = false;
      sectionLogOut.hidden = false;
    }
  });
}

const logIn = () => {
  const auth = firebase.auth();
  user.email = txtEmailLogIn.value;
  user.password = txtPasswordLogIn.value;
  if (user.email !== "" && user.password !== "") {
    const promise = auth.signInWithEmailAndPassword(user.email, user.password).then(() => validateLogIn());
    promise.catch(e => console.log(e.message));
  }
}

const verificate = () => {
  let x = firebase.auth().currentUser;
  if (x) {
    x.sendEmailVerification().then(() => {
      console.log("enviando");
      document.getElementById("user-name-sign-up").innerHTML = user.name;
      sectionSignUp.hidden = true;
      sectionResponseSignUp.hidden = false;
      sectionLogOut.hidden = false;
    }).catch(function (error) {
      console.log(error);
    });
  }
}

const signUp = () => {
  const auth = firebase.auth();
  user.name = txtNameSignUp.value;
  user.email = txtEmailSignUp.value;
  user.password = txtPasswordSignUp.value;
  if (user.email !== "" && user.password !== "") {
    const promise = auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
      verificate();
    });
    promise.catch(e => console.log(e.message));
  }
}

const showSignUp = () => {
  sectionLogIn.hidden = true;
  sectionSignUp.hidden = false;
}

const showLogIn = () => {
  sectionSignUp.hidden = true;
  sectionLogIn.hidden = false;
}

const googleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then( () => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let result = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // ...
  }).catch(function(error) {
    console.log(error);
  });
  
  if (user) {
    sectionLogIn.hidden = true;
    sectionResponseLogIn.hidden = false;
    sectionLogOut.hidden = false;

  };
 }


btnLogIn.addEventListener("click", () => logIn());
goToSignUp.addEventListener("click", () => showSignUp());
goToLogIn.addEventListener("click", () => showLogIn());
btnSignUp.addEventListener("click", () => signUp());
btnGoogleLogIn.addEventListener("click", () => googleAccount());
btnLogOut.addEventListener("click", () => logOut());
