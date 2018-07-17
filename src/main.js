// sections que están generales
const sectionResponseLogIn = document.getElementById("response-log-in");
const sectionResponseSignUp = document.getElementById("response-sign-up");
const sectionLogOut = document.getElementById("log-out");
const btnLogOut = document.getElementById("btn-log-out");

// botones de NAV
const navBtnLogIn = document.getElementById("nav-modal-log-in");
const navBtnSignUp = document.getElementById("nav-modal-sign-up");

// modals dentro de MAIN
const modalLogIn = document.getElementById("modal-log-in");
const modalSignUp = document.getElementById("modal-sign-up");

// dentro de modalLogIn
const closeModalLogIn = document.getElementById("close-log-in");
const sectionLogIn = document.getElementById("main-log-in");

// dentro de sectionLogIn
const txtEmailLogIn = document.getElementById("txt-user-mail-login");
const helperEmailLogIn = document.getElementById("incorrect-email");

const txtPasswordLogIn = document.getElementById("txt-user-password-login");
const helperPasswordLogIn = document.getElementById("incorrect-password");

const btnEmailLogIn = document.getElementById("btn-email-log-in");
const btnFacebookLogIn = document.getElementById("btn-fb-log-in");
const btnGoogleLogIn = document.getElementById("btn-google-log-in");
const goToSignUp = document.getElementById("go-to-sign-up");

// dentro de modalSignUp
const closeModalSignUp = document.getElementById("close-sign-up");
const sectionUserSelection = document.getElementById("select-user");
const optionsDoctors = document.getElementById('options-doctors');
const optionsUsers = document.getElementById("options-users");
const sectionSignUpDoctors = document.getElementById("main-sign-up-doctors");
const sectionSignUpUsers = document.getElementById("main-sign-up-users");

// dentro de sectionUserSelection
const goToSignUpDoctors = document.getElementById("sign-up-selection-doctors");
const goToSignUpUsers = document.getElementById("sign-up-selection-users");

// dentro de optionsDoctors
const txtEspecialidad = document.getElementById("specialty");
const helperEspecialidad = document.getElementById("incorrect-specialty");
const txtColegiatura = document.getElementById("colegiatura");
const helperColegiatura = document.getElementById("incorrect-colegiatura");
const btnModalEmailSignUpDoctors = document.getElementById("btn-email-modal-sign-up-doctors");
const btnModalFbSignUpDoctors = document.getElementById("btn-fb-modal-sign-up-doctors");
const btnModalGgSignUpDoctors = document.getElementById("btn-gg-modal-sign-up-doctors");

// dentro de optionsUsers
const btnModalEmailSignUpUsers = document.getElementById("btn-email-modal-sign-up-users");
const btnModalFbSignUpUsers = document.getElementById("btn-fb-modal-sign-up-users");
const btnModalGgSignUpUsers = document.getElementById("btn-gg-modal-sign-up-users");

// dentro de signup doctors de email sectionSignUpDoctors
const txtDoctorNameSignUp = document.getElementById("txt-doctor-name-signup");
const helperNameDoctorSignUp = document.getElementById("incorrect-doctor-name-sign-up");

const txtDoctorEmailSignUp = document.getElementById("txt-doctor-mail-signup");
const helperEmailDoctorSignUp = document.getElementById("incorrect-doctor-mail-sign-up");

const txtDoctorPasswordSignUp = document.getElementById("txt-doctor-password-signup");
const helperPasswordDoctorSignUp = document.getElementById("incorrect-doctor-password-sign-up");

const txtDoctorConfirmPasswordSignUp = document.getElementById("txt-doctor-confirm-password-signup");
const helperConfirmPasswordDoctorSignUp = document.getElementById("incorrect-doctor-confirm-password-sign-up");

const btnSignUpDoctors = document.getElementById("btn-sign-up-doctors");
const goToLogInFromDoctors = document.getElementById("go-to-log-in-doctors");

// dentro de signup users de email sectionSignUpUsers
const txtUserNameSignUp = document.getElementById("txt-user-name-signup");
const helperNameUserSignUp = document.getElementById("incorrect-user-name-sign-up");

const txtUserEmailSignUp = document.getElementById("txt-user-mail-signup");
const helperEmailUserSignUp = document.getElementById("incorrect-user-email-sign-up");

const txtUserPasswordSignUp = document.getElementById("txt-user-password-signup");
const helperPasswordUserSignUp = document.getElementById("incorrect-user-password-sign-up");

const txtUserConfirmPasswordSignUp = document.getElementById("txt-user-confirm-password-signup");
const helperConfirmPasswordUserSignUp = document.getElementById("incorrect-user-confirm-password-sign-up");

const btnSignUpUsers = document.getElementById("btn-sign-up-users");
const goToLogInFromUsers = document.getElementById("go-to-log-in-users");

const patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const user = {
  name: '',
  email: '',
  password: '',
  type: ''
}

// OK
const config = {
  apiKey: "AIzaSyADhe8BrL2a1vVRQnECNe4np96pxkwgoSw",
  authDomain: "salutem-a2461.firebaseapp.com",
  databaseURL: "https://salutem-a2461.firebaseio.com",
  projectId: "salutem-a2461",
  storageBucket: "salutem-a2461.appspot.com",
  messagingSenderId: "953244358481"
};

// OK
firebase.initializeApp(config);

window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      modalLogIn.style.display = "none";
      modalSignUp.style.display = "none";
      sectionResponseLogIn.hidden = false;
      sectionLogOut.hidden = false;
      navBtnLogIn.style.display = "none";
      navBtnSignUp.style.display = "none";
      if (user.displayName) {
        document.getElementById("user-name-log-in").innerHTML = `Bienvenido a Salutem ${user.displayName}`;
      }
    } else {
      M.updateTextFields();
      navBtnLogIn.style.display = "block";
      navBtnSignUp.style.display = "block";
    }
  });
}

const logOut = () => {
  firebase.auth().signOut().then(() => {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    // doctores
    txtEspecialidad.value = "";
    txtColegiatura.value = "";
    txtDoctorNameSignUp.value = "";
    txtDoctorEmailSignUp.value = "";
    txtDoctorPasswordSignUp.value = "";
    txtDoctorConfirmPasswordSignUp.value = "";
    //pacientes
    txtUserNameSignUp.value = "";
    txtUserEmailSignUp.value = "";
    txtUserPasswordSignUp.value = "";
    txtUserConfirmPasswordSignUp.value = "";

    sectionLogOut.hidden = true;
    sectionResponseLogIn.hidden = true;
    sectionResponseSignUp.hidden = true;
    // cuando se salga de sesión para cualquier caso siempre se mostrará el login
    modalLogIn.style.display = "block";
  });
}

// OK
const logIn = () => {
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(user.email, user.password);
  promise.catch(e => {
    helperPasswordLogIn.hidden = false;
    console.log(e);
  });
}

// OK
const validateLogIn = () => {
  if (txtEmailLogIn.value.length > 0 && patronEmail.test(txtEmailLogIn.value)) {
    helperEmailLogIn.hidden = true;
    if (txtPasswordLogIn.value !== "" && txtPasswordLogIn.value !== null) {
      helperPasswordLogIn.hidden = true;
      user.email = txtEmailLogIn.value;
      user.password = txtPasswordLogIn.value;
      if (user.email !== "" && user.password !== "") {
        logIn();
      }
    } else {
      helperPasswordLogIn.hidden = false;
    }
  } else {
    helperEmailLogIn.hidden = false;
  }
}

// OK
const showMuro = () => {
  document.getElementById("user-name-sign-up").innerHTML = user.name;
  closeNavModalSignUp();
  sectionResponseSignUp.hidden = false;
  sectionLogOut.hidden = false;
  sectionSignUpDoctors.style.display = "none";
  sectionSignUpUsers.style.display = "none";
}

// OK
const signUpByDoctors = () => {
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
    const x = firebase.auth().currentUser;
    if (x) {
      x.sendEmailVerification().then(() => {
        console.log("se envió correo de verificación de cuenta al correo");
        showMuro();
      }).catch(function (error) {
        alert(error);
      });
    }
  });
  promise.catch(e => alert(e.message));
}

// OK
//validaciones de signup divisiones para users
const ableSignUpByDoctors = () => {
  let name, email, password, confirmPassword;
  //nombre
  if (txtDoctorNameSignUp.value.length > 0) {
    name = true;
  } else if (!txtDoctorNameSignUp.value.length > 0) {
    name = false;
  }
  //email
  if (txtDoctorEmailSignUp.value.length > 0 && patronEmail.test(txtDoctorEmailSignUp.value)) {
    email = true;
  } else if (txtDoctorEmailSignUp.value.length === 0 || !patronEmail.test(txtDoctorEmailSignUp.value)) {
    email = false;
  }
  //new password
  if (txtDoctorPasswordSignUp.value.length >= 6) {
    password = true;
  } else if (txtDoctorPasswordSignUp.value.length < 6) {
    password = false;
  }
  //confirm password
  if (txtDoctorConfirmPasswordSignUp.value.length >= 6 && txtDoctorConfirmPasswordSignUp.value === txtDoctorPasswordSignUp.value) {
    confirmPassword = true;
  } else if (txtDoctorConfirmPasswordSignUp.value.length < 6 || txtDoctorConfirmPasswordSignUp.value !== txtDoctorPasswordSignUp.value) {
    confirmPassword = false;
  }
  // si todas las etiquetas estan ocultas hará el registro
  if (name && email && password && confirmPassword) {
    user.name = txtDoctorNameSignUp.value;
    user.email = txtDoctorEmailSignUp.value;
    user.password = txtDoctorPasswordSignUp.value;
    signUpByDoctors();
  }
}

// OK
const signUpUsers = (e) => {
  if (e.currentTarget.id === "btn-email-modal-sign-up-users") {
    sectionSignUpUsers.style.display = "block";
    sectionUserSelection.style.display = "none";
    optionsUsers.style.display = "none";
  } else {
    // aqui se deberia mostrar el signup para los doctores
    sectionSignUpDoctors.style.display = "block";
    sectionUserSelection.style.display = "none";
    optionsDoctors.style.display = "none";
  }
}

// OK
const signUpByUsers = () => {
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
    const x = firebase.auth().currentUser;
    if (x) {
      x.sendEmailVerification().then(() => {
        console.log("se envió correo de verificación de cuenta al correo");
        showMuro();
      }).catch(function (error) {
        alert(error);
      });
    }
  });
  promise.catch(e => alert(e.message));
}

// OK
//validaciones de signup divisiones para users
const ableSignUpByUsers = () => {
  let name, email, password, confirmPassword;
  //nombre
  if (txtUserNameSignUp.value.length > 0) {
    name = true;
  } else if (!txtUserNameSignUp.value.length > 0) {
    name = false;
  }
  //email
  if (txtUserEmailSignUp.value.length > 0 && patronEmail.test(txtUserEmailSignUp.value)) {
    email = true;
  } else if (txtUserEmailSignUp.value.length === 0 || !patronEmail.test(txtUserEmailSignUp.value)) {
    email = false;
  }
  //new password
  if (txtUserPasswordSignUp.value.length >= 6) {
    password = true;
  } else if (txtUserPasswordSignUp.value.length < 6) {
    password = false;
  }
  //confirm password
  if (txtUserConfirmPasswordSignUp.value.length >= 6 && txtUserConfirmPasswordSignUp.value === txtUserPasswordSignUp.value) {
    confirmPassword = true;
  } else if (txtUserConfirmPasswordSignUp.value.length < 6 || txtUserConfirmPasswordSignUp.value !== txtUserPasswordSignUp.value) {
    confirmPassword = false;
  }
  // si todas las etiquetas estan ocultas hará el registro
  if (name && email && password && confirmPassword) {
    user.name = txtUserNameSignUp.value;
    user.email = txtUserEmailSignUp.value;
    user.password = txtUserPasswordSignUp.value;
    signUpByUsers();
  }
}

// OK
const showSignUp = () => {
  // enlace de login para ingresar a signup
  txtEmailLogIn.value = "";
  txtPasswordLogIn.value = "";
  closeNavModalLogIn();
  openNavModalSignUp();
}

// OK
const showLogIn = () => {
  if (txtEmailLogIn !== "" && txtPasswordLogIn !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
  }
  closeNavModalSignUp();
  sectionSignUpUsers.style.display = "none";
  sectionSignUpDoctors.style.display = "none";
  openNavModalLogIn();
}

// OK
const googleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    console.log(result.user);
  }).catch(function (error) {
    console.log(error);
  });
}

// OK
const facebookAccount = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    console.log(result.user);
  }).catch(function (error) {
    console.log(error);
  });
}

// OK
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

// OK
let openNavModalLogIn = () => {
  modalLogIn.style.display = "block";
}

// OK
let closeNavModalLogIn = () => {
  // vaciamos contenido de login cuando se cierra el modal
  modalLogIn.style.display = "none";
  helperEmailLogIn.hidden = true;
  helperPasswordLogIn.hidden = true;
  txtEmailLogIn.value = "";
  txtPasswordLogIn.value = "";
  M.updateTextFields();
}

// OK
let openNavModalSignUp = () => {
  txtEspecialidad.value = "";
  txtColegiatura.value = "";
  txtDoctorNameSignUp.value = "";
  txtDoctorEmailSignUp.value = "";
  txtDoctorPasswordSignUp.value = "";
  txtDoctorConfirmPasswordSignUp.value = "";
  // para cualquier ocasion está quedando en blanquear las secciones y que solo aparezca la seleccion de usuarios
  sectionUserSelection.style.display = "block";
  optionsDoctors.style.display = "none";
  optionsUsers.style.display = "none";
  sectionSignUpDoctors.style.display = "none";
  sectionSignUpUsers.style.display = "none";
  modalSignUp.style.display = "block";
}

// OK
let closeNavModalSignUp = () => {
  modalSignUp.style.display = "none";
}


// login
navBtnLogIn.addEventListener("click", () => openNavModalLogIn());
closeModalLogIn.addEventListener("click", () => closeNavModalLogIn());
btnEmailLogIn.addEventListener("click", () => validateLogIn());
btnFacebookLogIn.addEventListener("click", () => facebookAccount());
btnGoogleLogIn.addEventListener("click", () => googleAccount());
goToSignUp.addEventListener("click", () => showSignUp());

// signup
navBtnSignUp.addEventListener("click", () => openNavModalSignUp());
closeModalSignUp.addEventListener("click", () => closeNavModalSignUp());
goToSignUpDoctors.addEventListener("click", (e) => showOptionsUserSelect(e));
goToSignUpUsers.addEventListener("click", (e) => showOptionsUserSelect(e));

// signup doctors
btnModalEmailSignUpDoctors.addEventListener("click", (e) => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length > 0) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    signUpUsers(e);
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});
btnModalFbSignUpDoctors.addEventListener("click", () => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length > 0) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    closeNavModalSignUp();
    facebookAccount();
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});
btnModalGgSignUpDoctors.addEventListener("click", () => {
  if (txtColegiatura.value.length > 0 && txtEspecialidad.value.length > 0) {
    helperColegiatura.hidden = true;
    helperEspecialidad.hidden = true;
    closeNavModalSignUp();
    googleAccount();
  } else {
    helperColegiatura.hidden = false;
    helperEspecialidad.hidden = false;
  }
});

txtDoctorNameSignUp.addEventListener("keyup", () => {
  if (txtDoctorNameSignUp.value.length > 0) {
    helperNameDoctorSignUp.hidden = true;
  } else if (!txtDoctorNameSignUp.value.length > 0) {
    helperNameDoctorSignUp.hidden = false;
  }
});
txtDoctorEmailSignUp.addEventListener("keyup", () => {
  if (txtDoctorEmailSignUp.value.length > 0 && patronEmail.test(txtDoctorEmailSignUp.value)) {
    helperEmailDoctorSignUp.hidden = true;
  } else if (txtDoctorEmailSignUp.value.length === 0 || !patronEmail.test(txtDoctorEmailSignUp.value)) {
    helperEmailDoctorSignUp.hidden = false;
  }
});
txtDoctorPasswordSignUp.addEventListener("keyup", () => {
  if (txtDoctorPasswordSignUp.value.length >= 6) {
    helperPasswordDoctorSignUp.hidden = true;
    password = true;
  } else if (txtDoctorPasswordSignUp.value.length < 6) {
    helperPasswordDoctorSignUp.hidden = false;
    password = false;
  }
});
txtDoctorConfirmPasswordSignUp.addEventListener("keyup", () => {
  if (txtDoctorConfirmPasswordSignUp.value.length >= 6 && txtDoctorConfirmPasswordSignUp.value === txtDoctorPasswordSignUp.value) {
    helperConfirmPasswordDoctorSignUp.hidden = true;
    confirmPassword = true;
  } else if (txtDoctorConfirmPasswordSignUp.value.length < 6 || txtDoctorConfirmPasswordSignUp.value !== txtDoctorPasswordSignUp.value) {
    helperConfirmPasswordDoctorSignUp.hidden = false;
    confirmPassword = false;
  }
});
btnSignUpDoctors.addEventListener("click", () => ableSignUpByDoctors());
goToLogInFromDoctors.addEventListener("click", () => showLogIn());

// signup users
btnModalEmailSignUpUsers.addEventListener("click", (e) => signUpUsers(e));
btnModalFbSignUpUsers.addEventListener("click", () => facebookAccount());
btnModalGgSignUpUsers.addEventListener("click", () => googleAccount());
txtUserNameSignUp.addEventListener("keyup", () => {
  if (txtUserNameSignUp.value.length > 0) {
    helperNameUserSignUp.hidden = true;
  } else if (!txtUserNameSignUp.value.length > 0) {
    helperNameUserSignUp.hidden = false;
  }
});
txtUserEmailSignUp.addEventListener("keyup", () => {
  if (txtUserEmailSignUp.value.length > 0 && patronEmail.test(txtUserEmailSignUp.value)) {
    helperEmailUserSignUp.hidden = true;
  } else if (txtUserEmailSignUp.value.length === 0 || !patronEmail.test(txtUserEmailSignUp.value)) {
    helperEmailUserSignUp.hidden = false;
  }
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
btnSignUpUsers.addEventListener("click", () => ableSignUpByUsers());
goToLogInFromUsers.addEventListener("click", () => showLogIn());

btnLogOut.addEventListener("click", () => logOut());

// FUNCIÓN PARA EL MENÚ DESPLEGABLE
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});
