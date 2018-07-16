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

// botones de NAV
const navBtnLogIn = document.getElementById("nav-modal-log-in");
const navBtnSignUp = document.getElementById("nav-modal-sign-up");

// modals
const modalLogIn = document.getElementById("modal-log-in");
const modalSignUp = document.getElementById("modal-sign-up");

const optionsDoctors = document.getElementById('options-doctors');
const optionsUsers = document.getElementById("options-users");
const closeModalLogIn = document.getElementsByClassName("close")[0];
const closeModalSignUp = document.getElementsByClassName("close")[1];

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

window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      sectionLogIn.hidden = true;
      sectionResponseLogIn.hidden = false;
      sectionLogOut.hidden = false;
      sectionUserSelection.hidden = true;
      optionsUsers.style.display = "none";
      optionsDoctors.style.display = "none";
      // User is signed in.
      // const displayName = user.displayName;
      // const email = user.email;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const uid = user.uid;
    } else {
      M.updateTextFields();
    }
  });
}

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

// const signUpUsers = () => {
//   sectionSignUp.hidden = false;
//   sectionSelectionUsers.hidden = true;
//   close();
// }

const signUpUsers = (e) => {
  if (e.currentTarget.id === "btn-email-modal-sign-up-users") {
    sectionSignUpUsers.hidden = false;
    sectionUserSelection.hidden = true;
    optionsUsers.style.display = "none";
  } else {
    txtEspecialidad.value = "";
    txtColegiatura.value = "";
    // aqui se deberia mostrar el signup para los doctores
    sectionSignUpDoctors.hidden = false;
    sectionUserSelection.hidden = true;
    optionsDoctors.style.display = "none";
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

let showOptionsUserSelect = (e) => {
  M.updateTextFields();
  if (e.currentTarget.id === "sign-up-selection-users") {
    sectionUserSelection.style.display = "none";
    optionsUsers.style.display = "block";
  } else {
    sectionUserSelection.style.display = "none";
    optionsDoctors.style.display = "block";
  }
};

// let closeModel = (e) => {
//   if (e.currentTarget.offsetParent.id === "modal-users") {
//     optionsUsers.style.display = "none";
//   } else {
//     optionsDoctors.style.display = "none";
//     txtEspecialidad.value = "";
//     txtColegiatura.value = "";
//   }
// };

let openNavModalLogIn = () => {
  modalLogIn.style.display = "block";
  console.log("open login")
}

let closeNavModalLogIn = () => {
  modalLogIn.style.display = "none";
  console.log("close login")
}

let openNavModalSignUp = () => {
  modalSignUp.style.display = "block";
  console.log("open login")
}

let closeNavModalSignUp = () => {
  modalSignUp.style.display = "none";
  console.log("close login")
}

// botones de NAV al apretarse saldran modals
navBtnLogIn.addEventListener("click", () => {
  openNavModalLogIn();
});
navBtnSignUp.addEventListener("click", () => {
  openNavModalSignUp();
});

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
goToSignUpDoctors.addEventListener("click", (e) => showOptionsUserSelect(e));
goToSignUpUsers.addEventListener("click", (e) => showOptionsUserSelect(e));
closeModalLogIn.addEventListener("click", () => closeNavModalLogIn());
closeModalSignUp.addEventListener("click", () => closeNavModalSignUp());
goToLogInFromDoctors.addEventListener("click", () => showLogIn());
goToLogInFromUsers.addEventListener("click", () => showLogIn());
btnSignUpDoctors.addEventListener("click", () => ableSignUpByDoctors());
btnSignUpUsers.addEventListener("click", () => ableSignUpByUsers());
btnGoogleLogIn.addEventListener("click", () => googleAccount());
btnFacebookLogIn.addEventListener("click", () => facebookAccount());
btnLogOut.addEventListener("click", () => logOut());

//button opciones
btnModalSignUpDoctors.addEventListener("click", (e) => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    signUpUsers(e)
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});
btnModalFbSignUpDoctors.addEventListener("click", () => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    facebookAccount();
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

txtUserPasswordSignUp.addEventListener("keyup", () => {
  if (txtUserPasswordSignUp.value.length >= 6) {
    helperPasswordUserSignUp.hidden = true;
  } else if (txtUserPasswordSignUp.value.length < 6) {
    helperPasswordUserSignUp.hidden = false;
  }
});
txtUserConfirmPasswordSignUp.addEventListener("keyup", () => {
  if (txtUserConfirmPasswordSignUp.value.length >= 6 && txtUserConfirmPasswordSignUp.value === txtUserPasswordSignUp.value) {
    helperConfirmPasswordUserSignUp.hidden = true;
  } else if (txtUserConfirmPasswordSignUp.value.length < 6 || txtUserConfirmPasswordSignUp.value !== txtUserPasswordSignUp.value) {
    helperConfirmPasswordUserSignUp.hidden = false;
  }
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
};