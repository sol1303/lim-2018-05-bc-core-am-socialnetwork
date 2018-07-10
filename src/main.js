let emailLogin = document.getElementById("user-mail-login");
let passwordLogin = document.getElementById("user-password-login");
let btnLogIn = document.getElementById("btn-log-in");
let emailSignIn = document.getElementById("user-mail-signin");
let passwordSignIn = document.getElementById("user-password-signin");
let btnSignIn = document.getElementById("btn-sign-in");
let btnLogOut = document.getElementById("btn-log-out");
let sectionLogOut = document.getElementById("log-out");
let sectionResponseLog = document.getElementById("response-log-in");
let sectionResponseSign = document.getElementById("response-sign-up");
let goToSignIn = document.getElementById("go-to-sign-in");
let goToLogIn = document.getElementById("go-to-log-in");
let sectionSignUp = document.getElementById("section-btn-sign-up");
let sectionLogIn = document.getElementById("section-btn-log-in");
let main = document.getElementById("main");

let user = {
  name: '',
  bornbirthdate: '',
  sex: '',
  city: '',
  district: '',
  email: '',
  password: ''
}

let config = {
  apiKey: "AIzaSyDW8PIGL6vbFaMhRy0PpXtNv_e59eZYmfs",
  authDomain: "auth-social-network.firebaseapp.com",
  databaseURL: "https://auth-social-network.firebaseio.com",
  projectId: "auth-social-network",
  storageBucket: "auth-social-network.appspot.com",
  messagingSenderId: "1041115691430"
};

firebase.initializeApp(config);

const logOut = () => {
  firebase.auth().signOut();
  main.hidden = false;
  btnLogOut.hidden = true;
  sectionResponseLog.hidden = true;
  sectionResponseSign.hidden = true;
  passwordLogin.value = "";
  emailLogin.value = "";
  console.log("saliste");
}



const logIn = () => {
  const auth = firebase.auth();
  user.email = emailLogin.value;
  user.password = passwordLogin.value;
  const promise = auth.signInWithEmailAndPassword(user.email, user.password);
  promise.catch(e => console.log(e.message));
  validateLogIn();
}

const validateLogIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      main.hidden = true;
      sectionLogOut.hidden = false;
      sectionResponseLog.hidden = false;
    } else {
      console.log("no entraste");
      sectionLogOut.hidden = true;
      sectionResponseLog.hidden = true;
    }
  });
}

const verificate = () => {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    console.log("enviando");
  }).catch(function (error) {
    console.log(error);
  });
}

const signIn = () => {
  const auth = firebase.auth();
  user.email = emailLogin.value;
  user.password = passwordLogin.value;
  const promise = auth.createUserWithEmailAndPassword(user.email, user.password);
  promise.catch(e => console.log(e.message));
  // verificate();
  main.hidden = true;
  sectionLogOut.hidden = false;
  sectionResponseSign.hidden = false;
}

const showSignUp = () => {
  passwordLogin.value = "";
  emailLogin.value = "";
  sectionLogIn.hidden = true;
  sectionSignUp.hidden = false;
}

const showLogIn = () => {
  passwordLogin.value = "";
  emailLogin.value = "";
  sectionLogIn.hidden = false;
  sectionSignUp.hidden = true;
}

btnLogIn.addEventListener("click", () => logIn());
goToSignIn.addEventListener("click", () => showSignUp());
goToLogIn.addEventListener("click", () => showLogIn());
btnSignIn.addEventListener("click", () => signIn());
btnLogOut.addEventListener("click", () => logOut());
