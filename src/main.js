// sections
let sectionLogIn = document.getElementById("main-log-in");
let sectionSelectionUsers = document.getElementById("select-user");
let sectionSignUp = document.getElementById("main-sign-up");
let sectionResponseLogIn = document.getElementById("response-log-in");
let sectionResponseSignUp = document.getElementById("response-sign-up");
let sectionLogOut = document.getElementById("log-out");
let modal = document.getElementById('myModal');
let spanLogIn = document.getElementsByClassName("close")[0];
let span = document.getElementsByClassName("close")[1];
let sectionLogInInput = document.getElementById("section-log-in");
let navMenuLogIn = document.getElementById("menu-log-in");
let sideMenuLogIn = document.getElementById("side-log-in");

// botones
let btnLogIn = document.getElementById("btn-log-in");
let btnSignUp = document.getElementById("btn-sign-up");
let btnLogOut = document.getElementById("btn-log-out");
let btnGoogleLogIn = document.getElementById("btn-google-log-in");
let btnFacebookLogIn = document.getElementById("btn-fb-log-in");
let btnEmailUserResgister = document.getElementById("userRegister");
let btnFacebookSignUp = document.getElementById("btn-fb-sign-up");
let btnGoogleSignUp = document.getElementById("btn-google-sign-up")

// inputs
let txtEmailLogIn = document.getElementById("txt-user-mail-login");
let txtPasswordLogIn = document.getElementById("txt-user-password-login");
let txtNameSignUp = document.getElementById("txt-user-name-signup");
let txtEmailSignUp = document.getElementById("txt-user-mail-signup");
let txtPasswordSignUp = document.getElementById("txt-user-password-signup");
let txtConfirmPasswordSignUp = document.getElementById("txt-user-confirm-password-signup");

// enlaces
let goToSignUp = document.getElementById("go-to-sign-up");
let goToLogIn = document.getElementById("go-to-log-in");
let goToSignUpUsers = document.getElementById("sign-up-users");
let goToSignUpDoctors = document.getElementById("sign-up-doctors");


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
    txtConfirmPasswordSignUp.value = "";
    sectionLogOut.hidden = true;
    sectionResponseLogIn.hidden = true;
    sectionSelectionUsers.hidden = true;
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

const signUpUsers = () => {
  sectionSignUp.hidden = false;
  sectionSelectionUsers.hidden = true;
  close();
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
  if (user.email !== "" && user.password !== "" && txtConfirmPasswordSignUp.value !== "") {
    if (txtConfirmPasswordSignUp.value === user.password) {
      const promise = auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        verificate();
      });
      promise.catch(e => console.log(e.message));
    } else {
      M.toast({
        html: "Las contraseñas no coinciden"
      });
    }
  } else {
    M.toast({
      html: "Correo inválido o no completaste los campos"
    });
  }
}

const showSignUp = () => {
  if (txtEmailSignUp !== "" && txtPasswordSignUp !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    txtConfirmPasswordSignUp.value = "";
  }
  sectionLogInInput.hidden = true;
  sectionSelectionUsers.hidden = false;
  // sectionLogIn.style.display = "none";
}

const showLogIn = () => {
  if (txtEmailLogIn !== "" && txtPasswordLogIn !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
  }
  sectionSignUp.hidden = true;
  sectionLogInInput.hidden = false;
  sectionLogIn.style.display = "block";
}

const googleAccount = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

const facebookAccount = () => {
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.displayName);
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

let openModal = () => {
  modal.style.display = "block";
};

let openLogInNav = () => {
  sectionLogIn.style.display = "block";
};

//FUNCION PARA EL INGRESO EN MODAL
window.onload = function() {
  sectionLogIn.style.display = "block";
}

let close = () => {
  modal.style.display = "none";
};

let closeModel = () => {
  sectionLogIn.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

btnLogIn.addEventListener("click", () => logIn());
goToSignUp.addEventListener("click", () => showSignUp());
goToSignUpUsers.addEventListener("click", () => openModal());
userRegister.addEventListener("click", () => signUpUsers());
goToSignUpDoctors.addEventListener("click", () => console.log("seleccionaste doctores"));
goToLogIn.addEventListener("click", () => showLogIn());
btnLogIn.addEventListener("click", () => logIn());
btnSignUp.addEventListener("click", () => signUp());
btnGoogleLogIn.addEventListener("click", () => googleAccount());
btnFacebookLogIn.addEventListener("click", () => facebookAccount());
btnLogOut.addEventListener("click", () => logOut());
btnFacebookSignUp.addEventListener("click", () => facebookAccount());
btnGoogleSignUp.addEventListener("click", () => googleAccount());
span.addEventListener("click", () => close());
spanLogIn.addEventListener("click", () => closeModel());
navMenuLogIn.addEventListener("click", () => openLogInNav());
sideMenuLogIn.addEventListener("click", () => openLogInNav());

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

