let emailLogin = document.getElementById("user-mail-login");
let passwordLogin = document.getElementById("user-password-login");
let btnLogIn = document.getElementById("btn-log-in");
let emailSignIn = document.getElementById("user-mail-signin");
let passwordSignIn = document.getElementById("user-password-signin");
let btnSignIn = document.getElementById("btn-sign-in");
let btnLogOut = document.getElementById("btn-log-out");
let sectionSignUp = document.getElementById("sign-in");
let sectionLogOut = document.getElementById("log-out");
let sectionResponse = document.getElementById("response");

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
      console.log(user);
      sectionLogOut.hidden = false;
      sectionResponse.hidden = false;
    } else {
      console.log("no entraste");
      sectionLogOut.hidden = true;
      sectionResponse.hidden = true;
    }
  });
}

const signIn = () => {
  const auth = firebase.auth();
  user.email = emailSignIn.value;
  user.password = passwordSignIn.value;
  const promise = auth.createUserWithEmailAndPassword(user.email, user.password);
  promise.catch(e => console.log(e.message));
  document.write("CREASTE TU USUARIO EN FIREBASE");
}


btnLogIn.addEventListener("click", () => logIn());
btnSignIn.addEventListener("click", () => signIn());
btnLogOut.addEventListener("click", () => logOut());

