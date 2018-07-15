// sections
const sectionLogIn = document.getElementById("main-log-in");
const sectionSelectionUsers = document.getElementById("select-user");
const sectionSignUpUsers = document.getElementById("main-sign-up-users");
const sectionSignUpDoctors = document.getElementById("main-sign-up-doctors");
const sectionResponseLogIn = document.getElementById("response-log-in");
const sectionResponseSignUp = document.getElementById("response-sign-up");
const sectionLogOut = document.getElementById("log-out");

// botones
const btnLogIn = document.getElementById("btn-log-in");
const btnSignUp = document.getElementById("btn-sign-up");
const btnLogOut = document.getElementById("btn-log-out");
const btnGoogleLogIn = document.getElementById("btn-google-log-in");
const btnFacebookLogIn = document.getElementById("btn-fb-log-in");

// inputs
const txtEmailLogIn = document.getElementById("txt-user-mail-login");
const txtPasswordLogIn = document.getElementById("txt-user-password-login");
const txtUserNameSignUp = document.getElementById("txt-user-name-signup");
const txtUserEmailSignUp = document.getElementById("txt-user-mail-signup");
const txtUserPasswordSignUp = document.getElementById("txt-user-password-signup");
const txtConfirmPasswordSignUp = document.getElementById("txt-user-confirm-password-signup");

// enlaces
const goToSignUp = document.getElementById("go-to-sign-up");
const goToLogIn = document.getElementById("go-to-log-in");
const goToSignUpUsers = document.getElementById("sign-up-selection-users");
const goToSignUpDoctors = document.getElementById("sign-up-selection-doctors");

// modals
const modalDoctors = document.getElementById('modal-doctors');
const modalUsers = document.getElementById("modal-users");
const closeModalDoctors = document.getElementsByClassName("close")[0];
const closeModalUsers = document.getElementsByClassName("close")[1];

// modals buttons
const btnModalSignUpUsers = document.getElementById("btn-email-modal-sign-up-users");
const btnModalFbSignUpUsers = document.getElementById("btn-fb-modal-sign-up-users");
const btnModalGgSignUpUsers = document.getElementById("btn-gg-modal-sign-up-users");
const btnModalSignUpDoctors = document.getElementById("btn-email-modal-sign-up-doctors");
const btnModalFbSignUpDoctors = document.getElementById("btn-fb-modal-sign-up-doctors");
const btnModalGgSignUpDoctors = document.getElementById("btn-gg-modal-sign-up-doctors");

const patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const user = {
  name: '',
  email: '',
  password: ''
}

const config = {
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
      console.log("usuario logueado")
      // User is signed in.
      // const displayName = user.displayName;
      // const email = user.email;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const uid = user.uid;
    } else console.log("no estas logueado");
  });
}

const logOut = () => {
  firebase.auth().signOut().then(() => {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    txtUserNameSignUp.value = "";
    txtUserEmailSignUp.value = "";
    txtUserPasswordSignUp.value = "";
    txtConfirmPasswordSignUp.value = "";
    sectionLogOut.hidden = true;
    sectionResponseLogIn.hidden = true;
    sectionSelectionUsers.hidden = true;
    sectionResponseSignUp.hidden = true;
    sectionSignUpUsers.hidden = true;
    sectionLogIn.hidden = false;
    console.log("saliste");
  });
}

const logIn = () => {
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(user.email, user.password);
  promise.catch(e => {
    document.getElementById("incorrect-password").hidden = false;
  });
}

const validateLogIn = () => {
  if (txtEmailLogIn.value.length > 0 && patronEmail.test(txtEmailLogIn.value)) {
    document.getElementById("incorrect-email").hidden = true;
    if (txtPasswordLogIn.value !== "" && txtPasswordLogIn.value !== null) {
      document.getElementById("incorrect-password").hidden = true;
      user.email = txtEmailLogIn.value;
      user.password = txtPasswordLogIn.value;
      if (user.email !== "" && user.password !== "") {
        logIn();
      }
    } else {
      document.getElementById("incorrect-password").hidden = false;
    }
  } else {
    document.getElementById("incorrect-email").hidden = false;
  }
}

const signUpUsers = (e) => {
  if (e.currentTarget.id === "btn-email-modal-sign-up-users") {
    sectionSignUpUsers.hidden = false;
    sectionSelectionUsers.hidden = true;
    modalUsers.style.display = "none";
  } else {
    console.log(e.currentTarget.id);
    // aqui se deberia mostrar el signup para los doctores
    sectionSignUpDoctors.hidden = false;
    sectionSelectionUsers.hidden = true;
    modalDoctors.style.display = "none";
  }
}

const verificate = () => {
  const x = firebase.auth().currentUser;
  if (x) {
    x.sendEmailVerification().then(() => {
      console.log("se envió correo de verificación de cuenta al correo");
      document.getElementById("user-name-sign-up").innerHTML = user.name;
      sectionSignUpUsers.hidden = true;
      sectionResponseSignUp.hidden = false;
      sectionLogOut.hidden = false;
    }).catch(function (error) {
      console.log(error);
    });
  }
}

const signUp = () => {
  const auth = firebase.auth();
  user.name = txtUserNameSignUp.value;
  user.email = txtUserEmailSignUp.value;
  user.password = txtUserPasswordSignUp.value;
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
  if (txtUserEmailSignUp !== "" && txtUserPasswordSignUp !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    txtConfirmPasswordSignUp.value = "";
  }
  sectionLogIn.hidden = true;
  sectionSelectionUsers.hidden = false;
}

const showLogIn = () => {
  if (txtEmailLogIn !== "" && txtPasswordLogIn !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
  }
  sectionSignUpUsers.hidden = true;
  sectionLogIn.hidden = false;
}

const googleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    const person = result.user;
    document.getElementById("user-name-log-in").innerHTML = `Bienvenido a Salutem ${person.displayName}`;
  }).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
  });
}

const facebookAccount = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    const person = result.user;
    document.getElementById("user-name-log-in").innerHTML = `Bienvenido a Salutem ${person.displayName}`;
  }).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
  });
}

let openModal = (e) => {
  if (e.currentTarget.id === "sign-up-selection-users") {
    modalUsers.style.display = "block";
  } else {
    modalDoctors.style.display = "block";
  }
};

let closeModel = (e) => {
  if (e.currentTarget.offsetParent.id === "modal-users") {
    modalUsers.style.display = "none";
  } else {
    modalDoctors.style.display = "none";
  }
};

btnLogIn.addEventListener("click", () => validateLogIn());
goToSignUp.addEventListener("click", () => showSignUp());
goToSignUpUsers.addEventListener("click", (e) => openModal(e));
goToSignUpDoctors.addEventListener("click", (e) => openModal(e));
closeModalUsers.addEventListener("click", (e) => closeModel(e));
closeModalDoctors.addEventListener("click", (e) => closeModel(e));
btnModalSignUpUsers.addEventListener("click", (e) => signUpUsers(e));
btnModalSignUpDoctors.addEventListener("click", (e) => signUpUsers(e));
goToLogIn.addEventListener("click", () => showLogIn());
btnSignUp.addEventListener("click", () => signUp());
btnGoogleLogIn.addEventListener("click", () => googleAccount());
btnFacebookLogIn.addEventListener("click", () => facebookAccount());
btnLogOut.addEventListener("click", () => logOut());
btnModalFbSignUpUsers.addEventListener("click", () => facebookAccount());
btnModalGgSignUpUsers.addEventListener("click", () => googleAccount());
btnModalFbSignUpDoctors.addEventListener("click", () => facebookAccount());
btnModalGgSignUpDoctors.addEventListener("click", () => googleAccount());

// TODO:
// al seleccionar el tipo de usuario aparece un modal que muestra botones, en gg y fb hace el registro pero no desaparece la vista de selccion y aparece el muro
