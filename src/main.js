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
  const promise = auth.signInWithEmailAndPassword(user.email, user.password).then(() => validateLogIn());
  promise.catch(e => console.log(e.message));
}

const signUp = () => {
  const auth = firebase.auth();
  user.name = txtNameSignUp.value;
  user.email = txtEmailSignUp.value;
  user.password = txtPasswordSignUp.value;
  const promise = auth.createUserWithEmailAndPassword(user.email, user.password);
  promise.catch(e => console.log(e.message));
  let x = auth.currentUser;
  if (x) {
    x.sendEmailVerification().then(() => {
      console.log("enviando");
    }).catch(function (error) {
      console.log(error);
    });
  }
  document.getElementById("user-name-sign-up").innerHTML = user.name;
  sectionSignUp.hidden = true;
  sectionResponseSignUp.hidden = false;
  sectionLogOut.hidden = false;
}

const showSignUp = () => {
  sectionLogIn.hidden = true;
  sectionSignUp.hidden = false;
}

const showLogIn = () => {
  sectionSignUp.hidden = true;
  sectionLogIn.hidden = false;
}

btnLogIn.addEventListener("click", () => logIn());
goToSignUp.addEventListener("click", () => showSignUp());
goToLogIn.addEventListener("click", () => showLogIn());
btnSignUp.addEventListener("click", () => signUp());
btnLogOut.addEventListener("click", () => logOut());
